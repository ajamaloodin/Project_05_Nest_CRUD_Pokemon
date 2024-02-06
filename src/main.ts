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
    }), //Se pueden colocar pipes separados por ,
  );
  
  await app.listen(3000);

  
}
bootstrap();
