import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Pokedex API')
    .setDescription('The Pokedex API description')
    .setVersion('1.0')
    .addTag('App', 'General application endpoints')
    .addTag('Pokemon', 'Pokemon management endpoints')
    .addTag('Importar Pokemon', 'Pokemon import endpoints')
    .build();

  const content = SwaggerModule.createDocument(app, config);

  // Traditional Swagger UI
  SwaggerModule.setup('api', app, content);

  app.use('/api/docs', apiReference({ content }));


  await app.listen(process.env.PORT ?? 3000);
  console.log('Application is running on: http://localhost:3000');
  console.log('API Documentation (Swagger) available at: http://localhost:3000/api');
  console.log('API Documentation (Scalar) available at: http://localhost:3000/api/docs');
}
bootstrap();