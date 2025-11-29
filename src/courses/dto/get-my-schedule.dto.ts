import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetMyScheduleDto {
  @ApiProperty({ 
    example: 1, 
    description: '조회할 유저 ID' 
  })
  @Type(() => Number) 
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ 
    example: '2025-fall', 
    description: '조회할 학기' 
  })
  @IsString()
  @IsNotEmpty()
  semester: string;
}