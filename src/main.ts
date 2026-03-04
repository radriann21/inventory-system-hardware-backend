/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const config = new DocumentBuilder()
    .setTitle('Inventory System Hardware API')
    .setDescription(
      'API REST para la gestión de inventario de hardware. Permite administrar productos, categorías, unidades de medida y autenticación de usuarios.',
    )
    .setVersion('1.0.0')
    .setContact(
      'Inventory System Team',
      'https://github.com/radriann21',
      'support@inventorysystem.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addTag('auth', 'Endpoints de autenticación y gestión de usuarios')
    .addTag('categories', 'Gestión de categorías de productos')
    .addTag('measures', 'Gestión de unidades de medida')
    .addTag('products', 'Gestión de productos del inventario')
    .addCookieAuth(
      'access_token',
      {
        type: 'http',
        in: 'cookie',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token almacenado en cookie httpOnly',
      },
      'access_token',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token para autenticación',
      },
      'bearer',
    )
    .build();

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/api/reference',
    apiReference({
      spec: {
        content: document,
      },
      theme: 'purple',
      layout: 'modern',
      darkMode: true,
    }),
  );

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Inventory System API Docs',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
