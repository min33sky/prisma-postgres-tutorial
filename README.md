# Prisma Practice

> Prisma & Postgresql Pracitce ๐

## Getting Starts

```bash
npm start
```

## Note

1. Docker๋ก Postgres ์ค์น (๋ด๊ฑฐํด๋ ๋จ)

```bash
# Docker container ์์ฑ
docker run -p 5432:5432 --name sr-postgres -e POSTGRES_PASSWORD=qwe123 -e TZ=Asia/Seoul postgres:14.1
```

2. Prisma ์ค์น ํ Schema ์์ฑ

3. ๋ง์ด๊ทธ๋ ์ด์์ผ๋ก ๋๊ธฐํ ํด์ฃผ๊ธฐ

```bash
npx prisma migrate dev
```

4. .env์ ์ฐ๊ฒฐ ์ฃผ์ ๋ฑ๋ก (datagrip์์ ์ฌ์ฉ์๋ postgres ์๋ ฅ)

```bash
# postgres ๋น๋ฐ๋ฒํธ๋ docker ์ค์  ์ qwe123์ผ๋ก ์ค์ ํ๊ณ 
# DB์ด๋ฆ์ test๋ก ์์ฑํ  ๊ฒ์ด๋ค. (์๋์ผ๋ก ์์ฑ)
DATABASE_URL="postgresql://postgres:qwe123@localhost:5432/test"
```

5. CLient์์ Prisma๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด ํจํค์ง ์ค์น

```bash
npm i @prisma/client
```

6. `npx prisma generate`๋ฅผ ํธ์ถ ํด ๋์จ ์ฝ๋๋ฅผ ์ด์ฉํ์ฌ DB ๋ค๋ฃจ๊ธฐ

7. `seed`๋ฅผ ์ด์ฉํ์ฌ ๋ฐ์ดํฐ ์ฝ์

```bash
npx prisma db seed
```
