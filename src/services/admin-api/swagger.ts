import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('ADMIN | API documentation')
    .setDescription('Welcome to admin api!')
    .setVersion('2.0')
		.addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('admin-docs', app, document, {
		customJs: '/js/script.js',
	});
}
