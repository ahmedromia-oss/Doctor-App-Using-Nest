
import { Injectable } from '@nestjs/common';
import { DoctorEntity } from 'src/Models/Doctor.model';
import { Pagination } from 'src/Models/Pagination.model';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDoctorDTO } from './DTOs/CreateDoctor.DTO';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { CreateClinicDTO } from 'src/Clinics/DTOs/CreateClinic.DTO';
import { UpdateClinicDTO } from 'src/Clinics/DTOs/UpdateClinics.DTO';
import {v4 as uuidv4} from 'uuid';


@Injectable()
export class DoctorsService{
    
  private readonly Doctors: DoctorEntity[] = [];

  constructor(private readonly prismService:PrismaService){
  

  }
  async UpdateClinic(Id:string , user,updateClinic:UpdateClinicDTO){
    if(await this.prismService.clinic.findFirst({where:{Id:Id , DoctorId:user.sub} , include:{Doctor:true}}) != null){
      if(await this.prismService.clinic.findFirst({where:{Name:updateClinic.Name , NOT:{Id:Id}}}) == null){
        const clinic = await this.prismService.clinic.update({where:{Id:Id} , data:updateClinic})
        return clinic
      }
   
      throw new BadRequestException("This name is already taken")

    }
    throw new NotFoundException("No clinics with this ID")
    
    
  }

  async RemoveClinic(Id:string , user){
    if(await this.prismService.clinic.findFirst({where:{Id:Id , DoctorId:user.sub} , include:{Doctor:true}}) != null){
    const clinic = await this.prismService.clinic.delete({where:{Id:Id}})
    return "Removed"
    }
    throw new NotFoundException("Clinic Not Found")
  }

  async AddClinic(createClinicDTO:CreateClinicDTO , Doctor){
    if(await this.FindClinic(createClinicDTO.Name) == null){
      const clinic =await this.prismService.clinic.create({
        include:{Doctor:{include:{Category:true , User:true}}},
        data:{
          ...createClinicDTO,
          DoctorId:Doctor.sub
        }
      })

     return clinic
    }
    else{
      throw new BadRequestException("This name is already taken")
    }
    
  }
  async FindClinic(Name:string){
    const clinic = await this.prismService.clinic.findUnique({where:{Name:Name} , include:{Doctor:{include:{User:true}}}})
    return clinic
  }
 

  async create(createDoctorDTO:CreateDoctorDTO){

    let myuuid = uuidv4()

    const category =await this.prismService.category.findUnique({where:{Name:createDoctorDTO.Category}})
    
    if(category != null){
      const user = this.prismService.user.create({

            
        data:{
          Id:myuuid,
          UserName:createDoctorDTO.UserName,
          Email:createDoctorDTO.Email,
          Password: createDoctorDTO.Password,
          IsDoctor:true
        }
      })
      const newDoctor = this.prismService.doctor.create({
        
        include:{Category:true , User:true},
        data:{
        
          Id:myuuid,
          CategoryId:category.Id,
        }
      })
      try{
        const DoctorResult = await this.prismService.$transaction([user , newDoctor])
        return DoctorResult[1] 
      } 
      catch(e){
        throw new BadRequestException("Something Wrong Happened")
      }

    }  
    throw new NotFoundException("No Category with this name")
   



  }
 
  async FindAllDoctors(args:Pagination={skip:0 , take:1}) {
    return await this.prismService.doctor.findMany({
      skip:args.skip,
      take:args.take,
      include:{
        User:true,
        Clinics:true,
        Category:true
      }
    })
   
  }

  async FindAllClinics(args:Pagination={skip:0 , take:1}) {
    return await this.prismService.clinic.findMany({
      skip:args.skip,
      take:args.take,
      include:{
        Doctor:{include:{User:true}}
      }
    })
   
  }

}



