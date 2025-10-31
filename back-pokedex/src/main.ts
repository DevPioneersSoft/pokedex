import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('pokedex')
    .setDescription('APIRest para la pokedex')
    .setVersion('1.8')
    .build();

    const content = SwaggerModule.createDocument(app, config);

    app.use('/docs', apiReference({
      content: content
    }));
  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
