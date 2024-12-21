import { ApiProperty } from '@nestjs/swagger';
import { PlaceDto } from './place.dto';

export class CityRequestDto {
  @ApiProperty({ example: '90210' })
  postCode: string;

  @ApiProperty({ example: 'US' })
  country: string;

  @ApiProperty({ type: [PlaceDto] })
  places: PlaceDto[];
}
