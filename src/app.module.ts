import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AdminModule } from './Admin/Admin.module';
import { CategoryModule } from './Categories/Category.module';
import { Constants } from './Constants';
import { DoctorsModule } from './Doctors/Doctors.module';
import { UserModule } from './User/User.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      uploads: false,
      
      driver:ApolloDriver,
      autoSchemaFile: true,
      sortSchema:true,
      formatError: (error) => {
       
        const graphQLFormattedError = {
          message:
            error.extensions?.exception?.response?.message || error.message,
          code:
            Constants.Responses[(error.extensions?.stacktrace)[0].split(":" , 1)[0] == "GraphQLError" ? error.extensions?.code : (error.extensions?.stacktrace)[0].split(":" , 1)[0]]
        };
        return graphQLFormattedError;

      },
    }),
 
    DoctorsModule,
    UserModule,
    CategoryModule,
    AdminModule,
    PrismaModule


  ],
  providers: [],
})
export class AppModule {}

