import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';
import { eq, ilike, and } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';

@Injectable()
export class CoursesRepository {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  // 1. 강의 검색 (DB 접근 로직만 존재)
  async findAll(keyword?: string) {
    if (!keyword) {
      return this.db.select().from(schema.courses);
    }
    return this.db
      .select()
      .from(schema.courses)
      .where(ilike(schema.courses.title, `%${keyword}%`));
  }

  // 2. 내 수강 목록 조회 (Join 포함)
  async findMyCourses(userId: number, semester: string) {
    return this.db.query.userCourses.findMany({
      where: (uc) => and(eq(uc.userId, userId), eq(uc.semester, semester)),
      with: { course: true },
    });
  }

  // 3. 수강 신청 (데이터 삽입)
  async createEnrollment(userId: number, courseId: number, semester: string) {
    return this.db.insert(schema.userCourses).values({
      userId,
      courseId,
      semester,
    });
  }
}