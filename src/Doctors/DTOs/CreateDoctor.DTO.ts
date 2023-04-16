import { Field, InputType } from "@nestjs/graphql";
import { Category } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEmail, IsEmpty, IsNotEmpty, isNotEmpty } from "class-validator";
import { CreateUserDTO } from "src/User/DTOs/CreateUser.DTO";

@InputType()
export class CreateDoctorDTO extends CreateUserDTO{
    @IsNotEmpty()
    @Field()
    @Transform(({value})=>value.toLowerCase())
    @Transform(({value}) => value?.trim())


    Category:string
    


}