import { Controller, Get, Post, Body, Query, Request, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { SearchCoursesDto } from './dto/search-courses.dto';
import { EnrollCourseDto } from './dto/enroll-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '내 시간표 조회',
    description: '로그인한 유저의 학기별 시간표를 가져옴'
  })
  getMySchedule(@Query() query: { semester: string }, @Request() req) {
    const userId = req.user.id; // JWT에서 사용자 ID 추출
    return this.coursesService.getMySchedule(userId, query.semester);
  }

@Post('enroll')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '수강 신청',
    description: '로그인한 유저가 원하는 강의를 시간표에 추가'
  })
  enroll(@Body() body: EnrollCourseDto, @Request() req) {
    const userId = req.user.id; // JWT에서 사용자 ID 추출
    return this.coursesService.enroll(userId, body.courseId, body.semester);
  }
}