import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './common/Pipes/ValidationPipe';
import { PrismaService } from '../prisma/prisma.service';
import graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new CustomValidationPipe({
      transform:true,
    }),
  );

  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10    }));
 
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)
  await app.listen(process.env.MY_PORT);
}
bootstrap();
