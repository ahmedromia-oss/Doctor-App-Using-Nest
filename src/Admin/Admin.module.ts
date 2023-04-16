import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/User/User.module";
import { PrismaModule } from "prisma/prisma.module";

@Module({
    exports:[],
    imports:[
      forwardRef(()=>PrismaModule),
      forwardRef(() => UserModule) , forwardRef(()=>AuthModule)],
    providers: [
    ],
  })
  export class AdminModule {}