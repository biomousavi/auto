import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './common/env.validation';
import { GlobalValidationPipe } from './common/validation.pipe';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './common/swagger';
import { AllExceptionsFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get env config
  const configService: ConfigService<EnvironmentVariables> = app.get(ConfigService);

  // Add global validation pipe
  app.useGlobalPipes(GlobalValidationPipe);

  // Apply the filter globally
  app.useGlobalFilters(new AllExceptionsFilter());

  // add global prefix for controllers
  app.setGlobalPrefix('/api');

  // security middleware
  app.use(helmet());

  // swagger config
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);

  // Start the app
  await app.listen(configService.get('BACKEND_PORT'), '0.0.0.0', async () => {
    console.log(`server is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
