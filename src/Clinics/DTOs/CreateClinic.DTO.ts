import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from "class-validator"
@InputType()
export class CreateClinicDTO{
    @Field()
    @IsNotEmpty()
    @MaxLength(35)
    @MinLength(5)
    @Transform(({value})=>value.toLowerCase())
    @Transform(({value}) => value?.trim())


    Name:string

    @IsPhoneNumber()
    @Field()
    PhoneNumber:string

    @IsNotEmpty()
    @Transform(({value}) => value?.trim())
    @Field()
    Location:string

}