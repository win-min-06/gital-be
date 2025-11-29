import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  // DB 대신 Repository를 주입
  constructor(private readonly coursesRepository: CoursesRepository) {}

  // [New 탭] 강의 검색
  async search(keyword: string) {
    // 만약 "검색어는 2글자 이상이어야 한다" 같은 룰이 있다면 여기서 검사합니다.
    return this.coursesRepository.findAll(keyword);
  }

  // [Home 탭] 내 강의 목록
  async getMySchedule(userId: number, semester: string) {
    return this.coursesRepository.findMyCourses(userId, semester);
  }

  // [New 탭] 수강 신청
  async enroll(userId: number, courseId: number, semester: string) {
    // 예: "이미 신청한 강의인지 확인" 같은 로직이 들어갈 자리
    return this.coursesRepository.createEnrollment(userId, courseId, semester);
  }
}