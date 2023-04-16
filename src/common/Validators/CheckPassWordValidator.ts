
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({async:true})
export class CustomPasswordvalidation implements ValidatorConstraintInterface {

  async validate(value: string): Promise<boolean> {
    let exactMatch = new RegExp("^(?!.{16}$).{8,}$");
    
    if(value.match(exactMatch)){
    
        return true
    }
    return false
    
 
  }
  defaultMessage(args: ValidationArguments) {
    return "Minimum eight characters";
}
}
      
