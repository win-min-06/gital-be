import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config(); // .env 파일 읽어오기

export default defineConfig({
  schema: './src/db/schema.ts', // 아까 만든 스키마 위치
  out: './drizzle',             // 마이그레이션 파일이 생길 폴더 이름
  dialect: 'postgresql',        // 사용하는 DB 종류
  dbCredentials: {
    url: process.env.DATABASE_URL!, // .env에서 가져온 주소
  },
});