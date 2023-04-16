
import { Injectable, ArgumentMetadata, BadRequestException, ValidationPipe} from '@nestjs/common';






@Injectable()
export class CustomValidationPipe extends ValidationPipe {


    public async transform (value, metadata: ArgumentMetadata) {
        try {
          return await super.transform(value, metadata)
        } catch (e) {
          console.log()
            throw new BadRequestException(e.getResponse()["message"].join(" , "))  
        }
      }
    }
    
  

