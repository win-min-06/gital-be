import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  // 유저 생성 (회원가입)
  async create(email: string, name: string, password: string) {
    return this.db.insert(schema.users).values({ email, name, password }).returning();
  }

  // 유저 조회 (로그인 시 필요)
  async findByEmail(email: string) {
    return this.db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });
  }
}