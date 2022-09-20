import { faker } from '@faker-js/faker';
import { Provider } from '@prisma/client';
import { nanoid } from 'nanoid';
import { prisma } from './lib/db';

const providerMap: Record<number, Provider> = {
  0: 'LOCAL',
  1: 'NAVER',
  2: 'KAKAO',
};

async function userSeed() {
  //? user 생성
  for (let i = 0; i < 1000; i++) {
    const nickname = nanoid(12); //? faker 중복 발생 방지용으로 사용
    const provider = providerMap[Math.floor(Math.random() * 3)];

    await prisma.user.create({
      data: {
        nickname,
        provider,
        email: faker.internet.email().slice(0, 30),
        name: faker.name.fullName().slice(0, 15),
      },
    });
  }
}

async function postSeed() {
  let count = 0;
  while (count < 500) {
    const authorId = Math.floor(Math.random() * 1000);

    const existedUser = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!existedUser) continue;

    await prisma.post.create({
      data: {
        content: faker.lorem.paragraphs().slice(0, 254),
        thumbnail: faker.image.imageUrl(),
        authorId,
      },
    });

    count++;
  }
}

// userSeed();
postSeed();
