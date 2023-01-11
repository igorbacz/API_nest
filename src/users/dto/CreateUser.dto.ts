import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@user.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'user1234',
  })
  password: string;
}
