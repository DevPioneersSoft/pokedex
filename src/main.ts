import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {apiReference} from '@scalar/nestjs-api-reference'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle("Pokedex")
  .setDescription("APIREST para la POKEDEX")
  .setVersion("1.0")
  .build();
  const content = SwaggerModule.createDocument(app,config)

  app.use('/docs',apiReference({
    content: content
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
