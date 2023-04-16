import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from "class-validator"
@InputType()
export class CreateCategoryDTO{
    @Field()
    @IsNotEmpty()
    @MaxLength(35)
    @MinLength(3)
    @Transform(({value})=>value.toLowerCase())
    @Transform(({value}) => value?.trim())


    Name:string
}