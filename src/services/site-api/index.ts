import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';
import { SiteApiModule } from './site-api.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const PORT = +process.env.RUN_PORT || 4040;

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(SiteApiModule, { cors: true });
	app.useStaticAssets(join(__dirname, '..', '..', '..', `assets`));
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
	await app.listen(PORT, process.env.RUN_HOST || '127.0.0.1');
}

bootstrap();
