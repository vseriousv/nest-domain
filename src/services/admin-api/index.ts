import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';
import { AdminApiModule } from './admin-api.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const PORT = +process.env.ADMIN_API_PORT || 4080;

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AdminApiModule, { cors: true });
	app.useStaticAssets(join(__dirname, '..', '..', '..', `assets`));
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
	await app.listen(PORT, process.env.ADMIN_API_HOST || '127.0.0.1');
}

bootstrap();
