import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'biomousavi' })
  username: string;

  @ApiProperty({ example: 'Test123' })
  password: string; // Decrypted password
}
