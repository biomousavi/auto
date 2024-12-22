import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ZipCodeService {
  private readonly apiBaseUrl = 'https://api.zippopotam.us/us';
  constructor(private readonly httpService: HttpService) {}

  async getByPostCode(postCode: string) {
    try {
      const response = await this.httpService.axiosRef.get(`${this.apiBaseUrl}/${postCode}`);

      return {
        country: response.data.country,
        places: response.data.places.map((place) => ({
          placeName: place['place name'],
          state: place.state,
          abbreviation: place['state abbreviation'],
        })),
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException({ message: `Post code not found: ${postCode}` });
      }

      throw error;
    }
  }
}
