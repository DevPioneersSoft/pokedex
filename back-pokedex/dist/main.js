"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const nestjs_api_reference_1 = require("@scalar/nestjs-api-reference");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Pokedex')
        .setDescription('APIRest para la Pokedex')
        .setVersion('1.0')
        .build();
    const content = swagger_1.SwaggerModule.createDocument(app, config);
    app.use('/docs', (0, nestjs_api_reference_1.apiReference)({
        content
    }));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map