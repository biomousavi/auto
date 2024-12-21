import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from '../entities/place.entity';
import { AbstractRepository } from 'src/common/repositories/abstract.repository';

@Injectable()
export class PlaceRepository extends AbstractRepository<Place> {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>
  ) {
    super(placeRepository);
  }

  async findByCity(cityId: number): Promise<Place[]> {
    return this.placeRepository.find({
      where: { city: { id: cityId } }
    });
  }
}