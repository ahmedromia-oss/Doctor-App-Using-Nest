import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UserResolver } from "./User.resolver";
import { UserService } from "./User.service";
import { PrismaModule } from "prisma/prisma.module";



@Module({
  exports:[UserService],
  imports:[
    forwardRef(()=>PrismaModule),
    forwardRef(() => AuthModule)],
  providers: [
   UserService,
    UserResolver,
  
    
  ],
})
export class UserModule {}