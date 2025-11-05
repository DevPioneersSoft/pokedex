import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './shared/interceptores/logging.interceptor';
import { PokedexLoggerMiddleware } from './pokedex-logger/pokedex.logger.middleware';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // valida la data que viene del front de manera global
  app.useGlobalPipes( 
      new ValidationPipe({
      whitelist: true,//permite los atributos que estar definidos
      forbidNonWhitelisted: true//bloquea peticiones de solcitudes que vengan con atributos no definidos
    })
  );

  app.use(new PokedexLoggerMiddleware().use)

  const config = new DocumentBuilder()
  .setTitle('Pokedex')
  .setDescription('APIRest para la pokedex')
  .setVersion('1.0')
  .build();

  const content = SwaggerModule.createDocument(app,config);

  app.use('/docs',apiReference({
    content
  }))

  app.use(cookieParser())
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials:true
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
