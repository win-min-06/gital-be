import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ 
    example: 1, 
    description: '유저 ID' 
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ 
    example: 1, 
    description: '강의 ID (DB 상의 ID)' 
  })
  @IsInt()
  @IsNotEmpty()
  courseId: number;

  @ApiProperty({ 
    example: '2025-fall', 
    description: '학기' 
  })
  @IsString()
  @IsNotEmpty()
  semester: string;
}