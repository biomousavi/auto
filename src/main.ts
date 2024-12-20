import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './common/env.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService<EnvironmentVariables> = app.get(ConfigService);


  await app.listen(configService.get("BACKEND_PORT"), "0.0.0.0", async () => {
    console.log(`server is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
