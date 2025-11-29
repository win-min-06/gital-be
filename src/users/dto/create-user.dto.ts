import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@example.com',
    description: '유저 이메일',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '유저 이름',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}