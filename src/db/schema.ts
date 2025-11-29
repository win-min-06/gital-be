// src/db/schema.ts
import { pgTable, serial, text, integer, boolean, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. users 테이블 (간단하게 정의)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
});

// 2. courses 테이블
export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  code: text('code').notNull(),         // 강의코드 (예: GS-1402)
  duplicateCode: text('duplicate_code'), // 중복코드 (예: MM-1402)
  title: text('title').notNull(),       // 강의명 (예: 다변수해석학과 응용)
  professor: text('professor'),         // 교수님 성함
  credit: integer('credit').notNull(),  // 학점
});

// 3. user_courses 테이블
export const userCourses = pgTable('user_courses', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  courseId: integer('course_id').notNull().references(() => courses.id),
  semester: text('semester').notNull(), // 학기 (예: 2025-fall)
  grade: text('grade'),                 // 성적 (예: A+, 아직 없으면 null)
}, (t) => ({
  //유저가 같은 학기에 같은 수업을 두 번 넣는 실수를 DB 차원에서 방지
  unq: uniqueIndex('user_course_unique_idx').on(t.userId, t.courseId, t.semester),
}));

// 4. 관계 설정 (Relations)
export const userCoursesRelations = relations(userCourses, ({ one }) => ({
  course: one(courses, {
    fields: [userCourses.courseId],
    references: [courses.id],
  }),
  user: one(users, {
    fields: [userCourses.userId],
    references: [users.id],
  }),
}));