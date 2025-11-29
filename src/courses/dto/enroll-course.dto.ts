import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class EnrollCourseDto {
  @ApiProperty({
    example: 1,
    description: '강의 ID',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @ApiProperty({
    example: '2025-fall',
    description: '학기 (예: 2025-fall)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  semester: string;
}