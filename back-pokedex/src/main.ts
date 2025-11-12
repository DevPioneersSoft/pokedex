import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';
import { PokedexLoggerMiddleware } from './pokedex-logger/pokedex-logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true,
      forbidNonWhitelisted : true
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('pokedex')
    .setDescription('APIRest para la pokedex')
    .setVersion('1.8')
    .build();

    const content = SwaggerModule.createDocument(app, config);

    app.use(new PokedexLoggerMiddleware().use);

    app.use('/docs', apiReference({
      content: content
    }));
  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
