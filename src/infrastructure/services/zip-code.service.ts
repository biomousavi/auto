import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ZipCodeService {
  private readonly apiBaseUrl = 'https://api.zippopotam.us/us';

  async fetchCityData(zipCode: string) {

  }
}