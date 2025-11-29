<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <strong>GITAL</strong> - 수강신청 앱 백엔드 API
</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="TypeScript" /></a>
<a href="https://www.drizzle.dev/" target="_blank"><img src="https://img.shields.io/badge/Drizzle-0F172A?style=flat&logo=drizzle&logoColor=white" alt="Drizzle ORM" /></a>
<a href="https://www.postgresql.org/" target="_blank"><img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
</p>

## 프로젝트 소개

**GITAL**은 NestJS 기반의 수강신청 앱 백엔드 API입니다. 학생들이 강의를 검색하고, 수강신청을 하며, 자신의 시간표를 관리할 수 있는 기능을 제공합니다.

### 주요 기능
-  **회원가입**: 사용자 계정 생성 및 관리
-  **강의 검색**: 강의명으로 강의 정보 검색
-  **수강신청**: 원하는 강의를 시간표에 추가
-  **내 시간표**: 학기별 수강 강의 목록 조회

### 기술 스택
- **Backend**: NestJS, TypeScript
- **Database**: PostgreSQL, Drizzle ORM
- **Documentation**: Swagger
- **Validation**: class-validator, class-transformer

## 시작하기

### 사전 요구사항
- Node.js (v18 이상)
- PostgreSQL
- npm 또는 yarn

### 설치

```bash
# 패키지 설치
$ npm install
```

### 환경 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수들을 설정하세요:

```bash
# 데이터베이스 연결 정보
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# 서버 포트 (선택사항, 기본값: 3000)
PORT=3000
```

### 데이터베이스 설정

1. PostgreSQL 데이터베이스를 생성합니다.
2. Drizzle 마이그레이션을 실행합니다:

```bash
# 마이그레이션 생성
$ npm run db:generate

# 마이그레이션 실행
$ npm run db:migrate
```

## 실행

```bash
# 개발 모드
$ npm run start:dev

# 디버그 모드
$ npm run start:debug

# 프로덕션 모드
$ npm run build
$ npm run start:prod
```

서버가 실행되면 다음 URL에서 접근할 수 있습니다:

- **API 서버**: http://localhost:3000
- **API 문서 (Swagger)**: http://localhost:3000/api

## API 문서

Swagger를 통해 자동으로 생성된 API 문서는 `/api` 경로에서 확인할 수 있습니다.

주요 엔드포인트:

| 메소드 | 경로 | 설명 |
|--------|------|------|
| POST | `/users` | 회원가입 |
| GET | `/courses` | 강의 검색 |
| GET | `/courses/my` | 내 시간표 조회 |
| POST | `/courses/enroll` | 수강신청 |

## 테스트

```bash
# 단위 테스트 실행
$ npm run test

# 테스트 커버리지 확인
$ npm run test:cov

# E2E 테스트 실행
$ npm run test:e2e

# 테스트 파일 감시 모드
$ npm run test:watch
```

## 프로젝트 구조

```
src/
├── app.controller.ts       # 앱 컨트롤러
├── app.module.ts          # 앱 모듈
├── main.ts                # 애플리케이션 진입점
├── db/
│   └── schema.ts          # Drizzle 데이터베이스 스키마
├── drizzle/
│   └── drizzle.module.ts  # Drizzle 모듈 설정
├── users/                 # 사용자 관련 모듈
│   ├── dto/
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.repository.ts
│   └── users.service.ts
└── courses/               # 강의 관련 모듈
    ├── dto/
    ├── courses.controller.ts
    ├── courses.module.ts
    ├── courses.repository.ts
    └── courses.service.ts
```

## 데이터베이스 스키마

### users 테이블
- `id`: 기본 키
- `email`: 이메일 (고유)
- `name`: 사용자 이름

### courses 테이블
- `id`: 기본 키
- `code`: 강의코드
- `duplicate_code`: 중복코드
- `title`: 강의명
- `professor`: 교수님
- `credit`: 학점

### user_courses 테이블
- `id`: 기본 키
- `user_id`: 사용자 ID (외래 키)
- `course_id`: 강의 ID (외래 키)
- `semester`: 학기
- `grade`: 성적

## 개발

### 코드 스타일

프로젝트에서는 Prettier와 ESLint를 사용하여 코드 스타일을 일관성 있게 유지합니다:

```bash
# 코드 포맷팅
$ npm run format

# 코드 린트 및 자동 수정
$ npm run lint
```

### 유용한 명령어

```bash
# 빌드
$ npm run build

# 특정 파일 변경 감시하며 개발 모드 실행
$ npm run start:dev -- --watch

# 새로운 모듈 생성 (Nest CLI)
$ nest generate module modules/module-name
$ nest generate controller modules/module-name
$ nest generate service modules/module-name
```

## 라이선스

이 프로젝트는 UNLICENSED 라이선스를 따릅니다.

## 도움말

더 많은 정보가 필요하다면 아래 리소스들을 확인하세요:

- [NestJS 공식 문서](https://docs.nestjs.com/)
- [Drizzle ORM 문서](https://orm.drizzle.team/)
- [PostgreSQL 문서](https://www.postgresql.org/docs/)

문제가 있거나 기여하고 싶다면 GitHub Issues를 통해 알려주세요.