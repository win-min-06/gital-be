import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { SearchCoursesDto } from './dto/search-courses.dto';
import { GetMyScheduleDto } from './dto/get-my-schedule.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  search(@Query() query: SearchCoursesDto) {
    return this.coursesService.search(query.keyword);
  }

  @Get('my')
  getMySchedule(@Query() query: GetMyScheduleDto) {
    return this.coursesService.getMySchedule(query.userId, query.semester);
  }

@Post('enroll')
  enroll(@Body() body: CreateEnrollmentDto) {
    return this.coursesService.enroll(
        body.userId, 
        body.courseId, 
        body.semester
    );
  }
}