import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, MaxLength, Validate } from "class-validator";
import { CustomPasswordvalidation } from "src/common/Validators/CheckPassWordValidator";

@InputType()
export class CreateUserDTO{
    
    

    @IsEmail()
    @MaxLength(50)
    @Transform(({value})=>value.toLowerCase())
    @Field()

    Email:string

    
    @Validate(CustomPasswordvalidation)
    @Field()
    Password:string
    @IsNotEmpty()
    @MaxLength(15)
    @Transform(({value}) => value?.trim())
    @Field()
    UserName:string


}