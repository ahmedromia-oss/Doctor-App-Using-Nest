import { Field, ObjectType } from "@nestjs/graphql"
import { CategoryEntity } from "./Category.model";
import { ResponseType } from "./ResponseModel"
import { UserEntity } from "./User.model";
import { ClinicEntity } from "./Clinic.model";


@ObjectType()
export class DoctorEntity{
    @Field()
    Id:string
    
    @Field(()=>[ClinicEntity])
    Clinics:ClinicEntity[]

    @Field(()=>UserEntity)
    User:UserEntity

    @Field(()=>CategoryEntity)
    Category:CategoryEntity

    @Field()
    rating:number

    
    

    

}
@ObjectType()
export class DoctorResponse extends ResponseType(DoctorEntity , false) {} 

@ObjectType()
export class DoctorsResponse extends ResponseType(DoctorEntity , true) {} 

@ObjectType()
export class NormalResponse extends(ResponseType(String , false)){}

