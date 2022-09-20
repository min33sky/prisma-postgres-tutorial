import { Provider } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import { prisma } from '../../../lib/db';
import { UserResponse } from './schema';

const usersRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Querystring: { page?: string; limit?: string } }>(
    '/',
    async (request, reply) => {
      const page = request.query.page ? parseInt(request.query.page) : 1;
      const limit = request.query.limit ? parseInt(request.query.limit) : 12;

      try {
        const [totalCount, users] = await Promise.all([
          prisma.user.count(),
          prisma.user.findMany({
            take: limit,
            skip: (page - 1) * limit,
            orderBy: {
              id: 'desc',
            },
            select: UserResponse,
          }),
        ]);

        return {
          totalCount,
          maxPage: Math.ceil(totalCount / limit),
          users,
        };
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
  );

  fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    try {
      const id = parseInt(request.params.id, 10);
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: UserResponse,
      });
      return user;
    } catch (error) {
      throw error;
    }
  });

  fastify.post<CreateUserRoute>('/', async (request, reply) => {
    const { agree, email, nickname, password, provider, name } = request.body;

    console.log('provider: ', provider, typeof provider);
    console.log('agree: ', agree, typeof agree);

    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          agree,
          email,
          nickname,
          password,
          provider,
        },
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  });

  fastify.patch<{ Params: { id: string }; Body: UserSchema }>(
    '/:id',
    async (request, reply) => {
      const id = parseInt(request.params.id, 10);
      try {
        const updatedUser = await prisma.user.update({
          where: {
            id,
          },
          data: request.body,
          select: UserResponse,
        });
        return updatedUser;
      } catch (error) {
        throw error;
      }
    },
  );

  fastify.delete<{ Body: { id: number } }>('/', async (request, reply) => {
    const id = request.body.id;
    console.log('id: ', id, typeof id);
    try {
      const deleteUser = await prisma.user.delete({
        where: {
          id,
        },
      });
      return deleteUser;
    } catch (error) {
      throw error;
    }
  });
};

type UserSchema = {
  nickname: string;
  email: string;
  provider: Provider;
  name: string;
  password?: string;
  agree?: boolean;
};

interface CreateUserRoute {
  Body: UserSchema;
}

export default usersRoute;
