import { Field, InputType } from "@nestjs/graphql"
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { Transform } from "class-transformer"
@InputType()
export class UpdateCategoryDTO{

    @Field({nullable:true})
    @IsString()
    @MaxLength(35)
    @MinLength(3)
    @Transform(({value})=>value.toLowerCase())
    @Transform(({value}) => value?.trim())
    @IsOptional()


    Name?:string

}