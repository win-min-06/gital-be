import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchCoursesDto {
  @ApiProperty({
    example: '다변수',
    description: '강의명 검색어 (비우면 전체 조회)',
  })
  @IsString()
  keyword: string;
}