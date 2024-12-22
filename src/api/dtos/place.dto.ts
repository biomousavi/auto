import { ApiProperty } from '@nestjs/swagger';

export class PlaceDto {
  @ApiProperty({ example: 'Beverly Hills' })
  placeName: string;

  @ApiProperty({ example: 'California' })
  state: string;

  @ApiProperty({ example: 'CA' })
  abbreviation: string;
}
