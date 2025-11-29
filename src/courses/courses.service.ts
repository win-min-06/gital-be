import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  // 강의 검색
  async search(keyword: string) {
    if (keyword && keyword.length < 2) {
      throw new Error('검색어는 최소 2글자 이상이어야 합니다.');
    }
    return this.coursesRepository.findAll(keyword);
  }

  // 내 강의 목록
  async getMySchedule(userId: number, semester: string) {
    return this.coursesRepository.findMyCourses(userId, semester);
  }

  // 수강 신청 (비즈니스 로직 구현)
  async enroll(userId: number, courseId: number, semester: string) {
    // 1. 강의 존재 확인
    const course = await this.coursesRepository.findCourseById(courseId);
    if (!course) {
      throw new NotFoundException('존재하지 않는 강의입니다.');
    }

    // 2. 유저 존재 확인
    const user = await this.coursesRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    // 3. 이미 신청한 강의인지 확인
    const existingEnrollment = await this.coursesRepository.findEnrollment(
      userId,
      courseId,
      semester
    );
    if (existingEnrollment) {
      throw new ConflictException('이미 신청한 강의입니다.');
    }

    // 4. 수강신청 생성
    const result = await this.coursesRepository.createEnrollment(userId, courseId, semester);

    return {
      success: true,
      message: '수강신청이 완료되었습니다.',
      data: result[0],
    };
  }
}