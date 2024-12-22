import { CityService } from 'src/infrastructure/services/city.service';
import { GetRequestsQuery } from '../get-requests.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetRequestsQuery)
export class GetMyRequestsHandler implements IQueryHandler<GetRequestsQuery> {
  constructor(private readonly cityService: CityService) {}

  async execute(query: GetRequestsQuery) {
    return this.cityService.getCityRequests(query);
  }
}
