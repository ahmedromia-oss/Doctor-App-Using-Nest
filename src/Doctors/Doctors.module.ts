import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/User/User.module';
import { DoctorsResolver } from './Doctors.resolver';
import { DoctorsService } from './Doctors.Service';

import { PrismaModule } from 'prisma/prisma.module';


@Module({
  exports:[DoctorsService],
  imports:[
    forwardRef(()=>PrismaModule),
    forwardRef(() => AuthModule) , 
    forwardRef(() => UserModule)],
  providers: [
    DoctorsService,
    DoctorsResolver,
    
  ],
})
export class DoctorsModule {}