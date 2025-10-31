import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // valida la data que viene del front de manera global
  app.useGlobalPipes( 
      new ValidationPipe({
      whitelist: true,//permite los atributos que estar definidos
      forbidNonWhitelisted: true//bloquea peticiones de solcitudes que vengan con atributos no definidos
    })
  );

  const config = new DocumentBuilder()
  .setTitle('Pokedex')
  .setDescription('APIRest para la pokedex')
  .setVersion('1.0')
  .build();

  const content = SwaggerModule.createDocument(app,config);

  app.use('/docs',apiReference({
    content
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
