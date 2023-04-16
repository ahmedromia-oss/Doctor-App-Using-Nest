
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/Models/User.model';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDTO } from './DTOs/CreateUser.DTO';
import { RatingDTO } from './DTOs/Rating.DTO';
import { createWriteStream } from 'fs';
import {v4 as uuidv4} from 'uuid';
import FileUpload = require('graphql-upload/GraphQLUpload.js');




@Injectable()
export class UserService{

    private readonly users:UserEntity[] = []
    constructor(private readonly prismaService:PrismaService){
  

  }
    
    async findUserByEmail(email: string){

      const user =  await this.prismaService.user.findUnique({where:{Email:email} , include:{ Doctor:{include:{Category:true , Clinics:true ,User:true}} , Admin:true}})
      if(user != null){
        if(user.IsDoctor){
          const doctor = { ...user  ,  ...user.Doctor  as any}
          return doctor
        }
        if(user.IsAdmin){
          const admin = {...user , ...user.Admin}
          return admin
        }
        else{
          return user
        }
      }
      return null
    }

    
    async create(User:CreateUserDTO): Promise<UserEntity>{
      const NewUser = await  this.prismaService.user.create({data:{...User}})
      return {...NewUser}
      
    }

    async AddRating(ratingDTO:RatingDTO , user){
      
      const doctor = await this.prismaService.user.findUnique({where:{Id:ratingDTO.DoctorId} , include:{Doctor:true}})

      
      if(doctor == null || doctor.Doctor == null){
        throw new NotFoundException("No Doctor with this ID")
      }

      if(doctor.Id == user.sub){
        throw new BadRequestException("You can't rate yourself!")
      }

     

      
      
      const UserRating = await this.prismaService.userRating.findUnique({where:{UserId_DoctorId:{DoctorId:doctor.Id , UserId:user.sub}}})
      if(UserRating){
        const ratingResult = (((doctor.Doctor.rating * doctor.Doctor.numberOfRatings) - UserRating.rating + ratingDTO.rating) / (doctor.Doctor.numberOfRatings))
        

        const userRating = this.prismaService.userRating.update({where:{UserId_DoctorId:{UserId:UserRating.UserId , DoctorId:UserRating.DoctorId}} , data:{rating:ratingDTO.rating}})
        const doctorToUpdate  = this.prismaService.doctor.update({where:{Id:doctor.Id} , data:{rating:ratingResult}})
        try{
          await this.prismaService.$transaction([userRating , doctorToUpdate])
          return "Rating Added"

        }
        catch{
          throw new BadRequestException("Something Wrong Happened")
        }

      }
      else if(doctor.Doctor){
        const ratingResult = (((doctor.Doctor.rating * doctor.Doctor.numberOfRatings) + ratingDTO.rating) / (doctor.Doctor.numberOfRatings+1))

        const UserRating =  this.prismaService.userRating.create({data:{UserId:user.sub , DoctorId:doctor.Doctor.Id , rating:ratingDTO.rating}})

        const doctorToCreate = this.prismaService.doctor.update({where:{Id:doctor.Doctor.Id} , data:{rating:ratingResult , numberOfRatings:doctor.Doctor.numberOfRatings+1}})
        try{
          await this.prismaService.$transaction([UserRating , doctorToCreate])
          return "Rating Added"

        }
        catch{
          throw new BadRequestException("Something Wrong Happened")
        }
      }
      throw new BadRequestException("No Doctor Found With that Id")
    }

    async UpdateProfilePhoto({createReadStream,filename , mimetype} , userId:string){
      let myuuid = uuidv4()
      filename = myuuid+filename
      const result =  new Promise<boolean>(async (resolve) =>{
      if(mimetype.split("/")[1] != "png" && mimetype.split("/")[1] != "jpeg" && mimetype.split("/")[1] != "jpg" ){
          filename = "/"
      } 
      return createReadStream()
          .pipe(createWriteStream("./Uploads/Images/" + filename))
          .on('finish', () => resolve(true))
          .on('error', () => resolve(false))
  }                                   
  );      
  if(await result){
      const user = await this.prismaService.user.update({where:{Id:userId} , data:{ProfilePhoto:filename}})
      return user
  }
  throw new BadRequestException("Something Wrong Happened")
  }
      
    }
    
      


    
 
  




