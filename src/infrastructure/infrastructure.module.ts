// infrastructure/infrastructure.module.ts
import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { CityService } from './services/city.service';
import { AuthService } from './services/auth.service';
import { ZipCodeService } from './services/zip-code.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EncryptionService } from './services/encryption.service';
import { EnvironmentVariables } from 'src/common/env.validation';

@Module({
  imports: [
    PersistenceModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<EnvironmentVariables>) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [CityService, AuthService, ZipCodeService, EncryptionService],
  exports: [CityService, AuthService, ZipCodeService, EncryptionService],
})
export class InfrastructureModule {}
