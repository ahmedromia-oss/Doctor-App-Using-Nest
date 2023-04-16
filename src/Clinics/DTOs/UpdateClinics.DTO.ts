import { Field, InputType } from "@nestjs/graphql"
import { IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator"
import { Transform } from "class-transformer"
@InputType()
export class UpdateClinicDTO{
    @Field({nullable:true})
    @IsString()
    @MaxLength(35)
    @MinLength(5)
    @Transform(({value})=>value.toLowerCase())
    @Transform(({value}) => value?.trim())
    @IsOptional()
    Name?:string

    @IsString()
    @IsPhoneNumber()
    @Field({nullable:true})
    @IsOptional()

    PhoneNumber?:string
    @IsString()
    @Transform(({value}) => value?.trim())
    @Field({nullable:true})
    @IsOptional()

    Location?:string

}
