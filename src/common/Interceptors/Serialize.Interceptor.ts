import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common"
import { map } from "rxjs"

import {plainToInstance} from "class-transformer"

export function serialize(dto:any){
    return UseInterceptors(new SerializeInterceptor(dto))
}

@Injectable()
  export class SerializeInterceptor implements NestInterceptor {
    statusCode:number
    dto:any
    constructor(dto:any){
      this.dto = dto
    }
    intercept(context: ExecutionContext, next: CallHandler) {
      
      return next.handle().pipe(
        
        map(data =>{

            return (plainToInstance(this.dto , data, {excludeExtraneousValues:true}))
          }          
        ))
    }
  }
    
        
          
          