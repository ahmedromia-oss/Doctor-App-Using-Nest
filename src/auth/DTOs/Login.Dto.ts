import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
@InputType()
export class LoginDto {
  @Field()
  @Transform((name) => name.key.toLowerCase)
  email: string;
  
  @Field()
  password: string;

}