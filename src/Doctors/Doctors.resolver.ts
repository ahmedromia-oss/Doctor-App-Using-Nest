import { UseGuards, UseInterceptors } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {  RoleAuthGaurd } from "src/auth/guards/RoleAuthGaurd";
import { Response, ResponseInterceptor } from "src/common/Interceptors/Response.Interceptor";
import { DoctorEntity, DoctorResponse, DoctorsResponse, NormalResponse } from "src/Models/Doctor.model";
import { Pagination } from "src/Models/Pagination.model";
import { Role, Roles } from "src/common/Decorators/Role-Decorator";
import { AuthService } from "src/auth/auth.service";
import { CreateDoctorDTO } from "./DTOs/CreateDoctor.DTO";
import { UserService } from "src/User/User.service";
import { CurrentUser } from "src/common/Decorators/Current-User.Decorator";
import { CreateClinicDTO } from "src/Clinics/DTOs/CreateClinic.DTO";
import { ClinicResponse, ClinicsResponse } from "src/Models/Clinic.model";
import { DoctorsService } from "./Doctors.Service";
import { UpdateClinicDTO } from "src/Clinics/DTOs/UpdateClinics.DTO";

@Resolver(of=>DoctorEntity)

export class DoctorsResolver {
       
    constructor(private readonly authService:AuthService  , private readonly userService:UserService,
        private readonly doctorService:DoctorsService
        ){
    
    }
    
   
    
    @UseInterceptors(new ResponseInterceptor(201 , "Created"))
    @Mutation(()=>DoctorResponse)
    async AddDoctor(@Args('Doctor') Doctor:CreateDoctorDTO){
       
        return await this.authService.signupDoctor(Doctor)

    }

    @Roles(Role.Doctor)
    @UseGuards(RoleAuthGaurd)
    @UseInterceptors(new ResponseInterceptor(200 , "Success"))
    @Query(()=>DoctorResponse)
    async DoctorProfile(@CurrentUser() user){
        return await this.userService.findUserByEmail(user.username)

    }

    @Roles(Role.Doctor)
    @UseGuards(RoleAuthGaurd)
    @Response(201 , "Created")
    @Mutation(()=>ClinicResponse)
    async AddClinic(@Args("data") createClinicDTO:CreateClinicDTO , @CurrentUser() user){
        return await this.doctorService.AddClinic(createClinicDTO , user)
    }

    @Roles(Role.Doctor)
    @UseGuards(RoleAuthGaurd)
    @Response(201 , "Created")
    @Mutation(()=>ClinicResponse)
    async UpdateClinic(@Args("id") id:string , @CurrentUser() user ,@Args("data") updateClinicDTO:UpdateClinicDTO ){
        return await this.doctorService.UpdateClinic(id , user, updateClinicDTO)
    }

    @Roles(Role.Doctor)
    @UseGuards(RoleAuthGaurd)
    @Response(203 , "Deleted")
    @Mutation(()=>NormalResponse)
    async RemoveClinic(@Args("id") id:string , @CurrentUser() user){
        return  await this.doctorService.RemoveClinic(id , user)
    }


   


    @Response(200 , "Success")
    @Query(()=>DoctorsResponse)
    async Doctors(@Args() pagination:Pagination){
        return await this.doctorService.FindAllDoctors(pagination)
    }

    @Response(200 , "Success")
    @Query(()=>ClinicsResponse)
    async Clinics(@Args() pagination:Pagination){
        return await this.doctorService.FindAllClinics(pagination)
    }

    }
