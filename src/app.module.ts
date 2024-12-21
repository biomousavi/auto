import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { PersistenceModule } from './persistence/persistence.module';
import { EnvironmentVariables, validate } from './common/env.validation';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'postgres',
        host: 'postgres',
        port: +configService.get('PG_PORT'),
        username: configService.get('PG_USERNAME'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'production' ? false : true,
      }),
    }),
    PersistenceModule,
    InfrastructureModule,
    ApiModule,
  ],
})
export class AppModule {}
