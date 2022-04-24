import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest Sample example')
    .setDescription('The nest sample API description')
    .setVersion('1.0')
    .addTag('project')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const allowedOrigins = ['http://localhost:4200'];

  app.use(helmet());
  app.enableCors({
    origin: allowedOrigins,
  });

  await app.listen(3000);
}
bootstrap();
