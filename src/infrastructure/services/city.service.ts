import { Injectable } from '@nestjs/common';
import { CityRepository } from '../../persistence/repositories/city.repository';
import { ZipCodeService } from './zip-code.service';

@Injectable()
export class CityService {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly zipCodeService: ZipCodeService,
  ) {}

  // async getCityByZipCode(zipCode: string) {}
}
