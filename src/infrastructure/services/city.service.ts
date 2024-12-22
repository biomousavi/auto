import { Injectable } from '@nestjs/common';
import { CityRepository } from '../../persistence/repositories/city.repository';
import { CityRequestDto } from 'src/api/dtos/city-request.dto';

@Injectable()
export class CityService {
  constructor(private readonly cityRepository: CityRepository) {}

  async saveCity(data: CityRequestDto, userId: number) {
    const city = await this.cityRepository.create({
      postCode: data.postCode,
      country: data.country,
      user: { id: userId },
      places: data.places,
    });

    return city;
  }
}
