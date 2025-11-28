import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  search(@Query('keyword') keyword: string) {
    return this.coursesService.search(keyword);
  }

  @Get('my')
  getMySchedule(
    @Query('userId') userId: string,
    @Query('semester') semester: string,
  ) {
    return this.coursesService.getMySchedule(Number(userId), semester);
  }

  @Post('enroll')
  enroll(
    @Body('userId') userId: number,
    @Body('courseId') courseId: number,
    @Body('semester') semester: string,
  ) {
    return this.coursesService.enroll(userId, courseId, semester);
  }
}