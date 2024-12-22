import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Auto Abzaar Swagger')
  .setDescription('Auto Abzaar Task APIs')
  .addBearerAuth()
  .build();

export { swaggerConfig };
