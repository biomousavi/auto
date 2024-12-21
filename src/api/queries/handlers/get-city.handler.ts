import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCityQuery } from '../get-city.query';
import { CityService } from 'src/infrastructure/services/city.service';

@QueryHandler(GetCityQuery)
export class GetCityHandler implements IQueryHandler<GetCityQuery> {
  constructor(private readonly cityService: CityService) {}

  async execute(query: GetCityQuery) {
    console.log(query, 'executed');
    return 'ok';
  }
}
