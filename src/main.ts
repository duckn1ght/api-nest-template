import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RapidocModule } from '@b8n/nestjs-rapidoc';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupDocs(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

async function setupDocs(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle(process.env.DOC_TITLE ?? 'API')
    .setDescription(process.env.DOC_DESCRIPTION ?? 'API Documentation')
    .setVersion(process.env.DOC_VERSION ?? '1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  RapidocModule.setup('api', app, document);
  SwaggerModule.setup('swagger', app, document);
}
