import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async create(email: string, name: string, password: string) {
    // 비밀번호 암호화
    const hashedPassword = await this.authService.hashPassword(password);
    return this.usersRepository.create(email, name, hashedPassword);
  }
}