import { Field, ObjectType } from "@nestjs/graphql";
import { DoctorEntity } from "./Doctor.model";
import { ResponseType } from "./ResponseModel";

@ObjectType()
export class ClinicEntity{
    @Field()
    Id:string
    @Field()
    Name:string
    @Field()
    PhoneNumber:string
    @Field()
    Location:string
    @Field(()=>DoctorEntity)
    Doctor:DoctorEntity
}

@ObjectType()

export class ClinicResponse extends ResponseType(ClinicEntity , false){}
@ObjectType()

export class ClinicsResponse extends ResponseType(ClinicEntity , true){}