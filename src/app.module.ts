import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [
    CoursesModule,
    DrizzleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
