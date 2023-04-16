import { Type } from "@nestjs/common"
import { Field, ObjectType } from "@nestjs/graphql"
import { DoctorsResolver } from "src/Doctors/Doctors.resolver"
import { DoctorEntity } from "./Doctor.model"

export function ResponseType<T>(ItemType: Type<T> , List:Boolean): any {
    @ObjectType({isAbstract:true})
    abstract class ResponseModel {
        
        @Field()
        message:string
        @Field()
        StatusCode:number
       
        @Field(()=>{
          if(List){
            return [ItemType]
          }
          return ItemType
        })
        data:T
    }
    return ResponseModel;
  }






   
   
