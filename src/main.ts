import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  // Configuración Swagger en NestJS
  const config = new DocumentBuilder()
    .setTitle('Documentation API REST')
    .setDescription('Documentacion de chat')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // URL API
  SwaggerModule.setup('docs', app, document);
  await app.listen(configService.get('PORT') || process.env.PORT || 3000);
}
bootstrap();
