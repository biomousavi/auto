import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { PlaceRepository } from './repositories/place.repository';
import { City } from './entities/city.entity';
import { User } from './entities/user.entity';
import { CityRepository } from './repositories/city.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Place, City, User])],
  providers: [PlaceRepository, CityRepository, UserRepository],
  exports: [],
})
export class PersistenceModule {}
