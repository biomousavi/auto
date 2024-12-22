import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCityQuery } from '../get-city.query';
import { CityService } from 'src/infrastructure/services/city.service';
import { ZipCodeService } from 'src/infrastructure/services/zip-code.service';

@QueryHandler(GetCityQuery)
export class GetCityHandler implements IQueryHandler<GetCityQuery> {
  constructor(
    private readonly cityService: CityService,
    private readonly zipCodeService: ZipCodeService,
  ) {}

  async execute(query: GetCityQuery) {
    // Get city data from external service
    const zipData = await this.zipCodeService.getByPostCode(query.postCode);

    // Save city and related places
    const city = await this.cityService.saveCity({ ...zipData, postCode: query.postCode }, query.userId);

    // Transform to DTO
    return {
      postCode: city.postCode,
      country: city.country,
      places: city.places.map((place) => ({
        placeName: place.placeName,
        state: place.state,
        abbreviation: place.abbreviation,
      })),
    };
  }
}
