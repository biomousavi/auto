import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../entities/city.entity';
import { AbstractRepository } from 'src/common/repositories/abstract.repository';

@Injectable()
export class CityRepository extends AbstractRepository<City> {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {
    super(cityRepository);
  }

  async findByPostCode(postCode: string): Promise<City | null> {
    return this.cityRepository.findOne({
      where: { postCode },
      relations: ['places', 'user'],
    });
  }

  async findByUser(userId: number, skip: number = 0, take: number = 10): Promise<[City[], number]> {
    return this.cityRepository.findAndCount({
      where: { user: { id: userId } },
      relations: ['places'],
      skip,
      take,
      order: { created_on: 'DESC' },
    });
  }
}
