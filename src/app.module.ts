import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ThrottlerModule } from "@nestjs/throttler";
import { AppService } from './app.service';
import { PersistenceModule } from './persistence/persistence.module';
import { validate } from './common/env.validation';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    PersistenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
