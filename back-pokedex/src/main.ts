import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';
import { PokedexLoggerMiddleware } from './pokedex-logger/pokedex-logger.middleware';
import cookieparser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  const config = new DocumentBuilder().
  setTitle('Pokedex')
  .setDescription('APIRest para la Pokedex')
  .setVersion('1.0')
  .build()

  const content = SwaggerModule.createDocument(app,config)

  app.use(new PokedexLoggerMiddleware().use)

  app.use('/docs', apiReference({
    content
  }))

  app.use(cookieparser());

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
