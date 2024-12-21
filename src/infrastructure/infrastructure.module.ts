// infrastructure/infrastructure.module.ts
import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { CityService } from './services/city.service';
import { AuthService } from './services/auth.service';
import { ZipCodeService } from './services/zip-code.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EncryptionService } from './services/encryption.service';

@Module({
  imports: [
    PersistenceModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CityService, AuthService, ZipCodeService, EncryptionService],
  exports: [CityService, AuthService, ZipCodeService, EncryptionService],
})
export class InfrastructureModule {}
