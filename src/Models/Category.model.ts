import { Field, ObjectType } from "@nestjs/graphql"
import { ResponseType } from "./ResponseModel"
import { UserEntity } from "./User.model"
import { DoctorEntity } from "./Doctor.model"

@ObjectType()
export class CategoryEntity{
    
    @Field()
    Id:string
    
    @Field()
    Name:string

    @Field(()=>[DoctorEntity])
    Doctors:DoctorEntity[]
    
    

    

}

@ObjectType()
export class CategoryResponse extends ResponseType(CategoryEntity , true){}

@ObjectType()
export class OneCategoryResponse extends ResponseType(CategoryEntity , false){}