import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from './courses.repository';

@Module({
  controllers: [CoursesController],
  providers: [
    CoursesService,
    CoursesRepository
  ],
})
export class CoursesModule {}
