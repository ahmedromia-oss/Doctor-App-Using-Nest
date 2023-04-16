import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common"

import { map } from "rxjs"

export function Response(code , message){
  return UseInterceptors(new ResponseInterceptor(code , message))
}
@Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    statusCode:number
    message:string
    constructor(statusCode , Message){
      this.statusCode = statusCode
      this.message = Message
      
    }
    
    intercept(context: ExecutionContext, next: CallHandler) {
      
      return next.handle().pipe(
        
        map(data =>{
            return {StatusCode:this.statusCode, message:this.message , data:data}
          }          
        ))
    }
  }
    
        
          
          