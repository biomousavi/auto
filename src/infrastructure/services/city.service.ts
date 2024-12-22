import { Injectable } from '@nestjs/common';
import { CityRepository } from '../../persistence/repositories/city.repository';
import { CityRequestDto } from 'src/api/dtos/city-request.dto';
import { GetRequestsQuery } from 'src/api/queries/get-requests.query';

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

  async getCityRequests(query: GetRequestsQuery) {
    const requests = await this.cityRepository.findAll({
      where: { user: { id: query.userId } },
      relations: ['places', 'user'],
      order: { created_on: 'DESC' },
      take: query.limit,
      skip: (query.page - 1) * query.limit,
    });

    return requests;
  }
}
