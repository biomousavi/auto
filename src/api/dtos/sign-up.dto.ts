import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength, MaxLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'Username (5-12 characters, allows !@1234567890_)',
    example: 'bio_123',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(12)
  @Matches(/^[a-zA-Z0-9!@_]+$/, {
    message: 'Username can only contain letters, numbers, and !@_',
  })
  username: string;

  @ApiProperty({
    description: 'Password (min 5 chars, must include capital letter and number)',
    example: 'Test123',
  })
  @IsString()
  @MinLength(5)
  @Matches(/^(?=.*[A-Z])(?=.*\d).*$/, {
    message: 'Password must contain at least one capital letter and one number',
  })
  password: string;
}
