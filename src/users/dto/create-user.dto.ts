import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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

  @ApiProperty({
    example: 'password123',
    description: '비밀번호 (최소 6자)',
    required: true,
  })
  @IsString()
  @MinLength(6)
  password: string;
}