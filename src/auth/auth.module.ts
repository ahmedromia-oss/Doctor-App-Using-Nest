import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { AdminModule } from 'src/Admin/Admin.module';
import { DoctorsModule } from 'src/Doctors/Doctors.module';
import { UserModule } from 'src/User/User.module';

import { AuthService } from './auth.service';
import { PrismaModule } from 'prisma/prisma.module';


@Module({
    exports:[AuthService , JwtModule],
    imports:[
      forwardRef(()=>PrismaModule),
      forwardRef(()=>UserModule), 
      forwardRef(()=>DoctorsModule),
      forwardRef(()=>AdminModule),
        JwtModule.registerAsync(jwtConfig),
          
        ],
          providers:[AuthService]
    
})
export class AuthModule {}
