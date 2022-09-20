# Prisma Practice

> Prisma & Postgresql Pracitce 🚀

## Getting Starts

```bash
npm start
```

## Note

1. Docker로 Postgres 설치 (딴거해도 됨)

```bash
# Docker container 생성
docker run -p 5432:5432 --name sr-postgres -e POSTGRES_PASSWORD=qwe123 -e TZ=Asia/Seoul postgres:14.1
```

2. Prisma 설치 후 Schema 작성

3. 마이그레이션으로 동기화 해주기

```bash
npx prisma migrate dev
```

4. .env에 연결 주소 등록 (datagrip에서 사용자는 postgres 입력)

```bash
# postgres 비밀번호는 docker 설정 시 qwe123으로 설정했고
# DB이름은 test로 생성할 것이다. (자동으로 생성)
DATABASE_URL="postgresql://postgres:qwe123@localhost:5432/test"
```

5. CLient에서 Prisma를 사용하기 위해 패키지 설치

```bash
npm i @prisma/client
```

6. `npx prisma generate`를 호출 해 나온 코드를 이용하여 DB 다루기

7. `seed`를 이용하여 데이터 삽입

```bash
npx prisma db seed
```
