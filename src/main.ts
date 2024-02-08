import { ConfigModule      } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remueve toda la data basura que envíen en el request
      forbidNonWhitelisted: true,
      //para que en los DTO se haga la conversion de string a number
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      },
    }), //Se pueden colocar pipes separados por ,
  );
  
  await app.listen(process.env.PORT);
  console.log(`Server Running on Port ${process.env.PORT}`);
  

  
}
bootstrap();
