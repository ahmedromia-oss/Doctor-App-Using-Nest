import { Field, ObjectType } from "@nestjs/graphql"
import { ResponseType } from "./ResponseModel"


@ObjectType()
export class UserEntity{
    
    @Field()
    Id:string
    @Field()
    Email:string
    Password:string
    IsDoctor:boolean
    @Field()
    UserName:string
    IsAdmin:boolean
    @Field()
    ProfilePhoto:string

    

}
@ObjectType()
export class UserResponse extends ResponseType(UserEntity , false) {} 

// @ObjectType()
// export class DoctorsResponse extends ResponseType(DoctorEntity , true) {} 


