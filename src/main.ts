import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable Global Validation (Checks DTOs automatically)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes extra properties that aren't in the DTO
      transform: true, // Converts incoming data to match DTO types
    }),
  );

  // 2. Setup Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Mini CRM API')
    .setDescription('API documentation for Users, Customers, and Tasks')
    .setVersion('1.0')
    .addBearerAuth() // Adds the "Authorize" button for JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger will be at /api

  // 3. Start the Server
  await app.listen(3000);
}
bootstrap();