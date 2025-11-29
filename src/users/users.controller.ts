import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Users (유저)')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: '회원가입',
    description: '새로운 유저를 생성합니다.'
  })
  @ApiCreatedResponse({ description: '유저 생성 성공', type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(
      createUserDto.email,
      createUserDto.name,
      createUserDto.password
    );

    // 비밀번호 필드 제외하고 반환
    const { password, ...userWithoutPassword } = user[0];
    return userWithoutPassword;
  }

  @Post('login')
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인합니다.'
  })
  @ApiOkResponse({
    description: '로그인 성공',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            name: { type: 'string' },
          },
        },
      },
    },
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password
    );

    if (!user) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    return this.authService.login(user);
  }
}