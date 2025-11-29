import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(email: string, name: string) {
    // 나중엔 여기서 비밀번호 암호화 등을 합니다.
    return this.usersRepository.create(email, name);
  }
}