import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { SearchCoursesDto } from './dto/search-courses.dto';
import { GetMyScheduleDto } from './dto/get-my-schedule.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Courses (강의 관리)')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ 
    summary: '강의 검색', 
    description: '강의명으로 검색' 
  })
  search(@Query() query: SearchCoursesDto) {
    return this.coursesService.search(query.keyword);
  }

  @Get('my')
  @ApiOperation({ 
    summary: '내 시간표 조회', 
    description: '특정 유저의 학기별 시간표를 가져옴'
  })
  getMySchedule(@Query() query: GetMyScheduleDto) {
    return this.coursesService.getMySchedule(query.userId, query.semester);
  }

@Post('enroll')
@ApiOperation({ 
  summary: '수강 신청', 
  description: '원하는 강의를 시간표에 추가' 
})
  enroll(@Body() body: CreateEnrollmentDto) {
    return this.coursesService.enroll(
        body.userId, 
        body.courseId, 
        body.semester
    );
  }
}