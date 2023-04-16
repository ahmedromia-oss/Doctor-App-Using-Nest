import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

@InputType()
export class RatingDTO{

    
    @Min(0)
    @Max(5)
    @IsNumber()
    @Field()
    rating:number

    @IsNotEmpty()
    @Field()
    DoctorId:string


}