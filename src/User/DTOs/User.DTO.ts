import { Field, ObjectType } from "@nestjs/graphql"
import { Expose } from "class-transformer"
import { ResponseType } from "src/Models/ResponseModel"

@ObjectType()
export class UserDTo{
    
    @Expose()
    @Field()
    Email:string
    @Field()
    @Expose()
    UserName:string
    @Field()
    @Expose()
    ProfilePhoto:string
}

@ObjectType()
export class UserDToResponse extends ResponseType(UserDTo , false){}
    
