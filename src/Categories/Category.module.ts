import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/User/User.module';


import { CategoryService } from './Category.Service';
import { CategoryResolver } from './Category.resolver';
import { PrismaModule } from 'prisma/prisma.module';


@Module({
  exports:[],
  imports:[
    forwardRef(()=>PrismaModule),
    forwardRef(() => UserModule) , forwardRef(()=>AuthModule)],
  providers: [
    CategoryService,
    CategoryResolver,
    
  ],
})
export class CategoryModule {}