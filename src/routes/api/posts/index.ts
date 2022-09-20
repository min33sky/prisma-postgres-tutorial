import { FastifyPluginAsync } from 'fastify';
import { prisma } from '../../../lib/db';

const postsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Querystring: { page?: string; limit?: string } }>(
    '/',
    async (request, reply) => {
      const page = request.query.page ? parseInt(request.query.page) : 1;
      const limit = request.query.limit ? parseInt(request.query.limit) : 12;

      try {
        const [totalCount, posts] = await Promise.all([
          prisma.post.count(),
          prisma.post.findMany({
            take: limit,
            skip: (page - 1) * limit,
            orderBy: {
              id: 'desc',
            },
            select: {
              id: true,
              content: true,
              thumbnail: true,
              createdAt: true,
              author: {
                select: {
                  id: true,
                  nickname: true,
                },
              },
            },
          }),
        ]);

        return {
          totalCount,
          maxPage: Math.ceil(totalCount / limit),
          posts,
        };
      } catch (error) {
        throw error;
      }
    },
  );

  fastify.post<{
    Body: {
      authorId: number;
      postId: number;
    };
  }>('/like', async (request, reply) => {
    const { authorId, postId } = request.body;

    try {
      const newLike = await prisma.like.create({
        data: {
          authorId,
          postId,
        },
      });
      return newLike;
    } catch (error) {
      throw error;
    }
  });

  fastify.get<{
    Params: {
      authorId: string;
    };
  }>('/like/:authorId', async (request, reply) => {
    try {
      const likedPosts = await prisma.like.findMany({
        where: {
          authorId: parseInt(request.params.authorId, 10),
        },
        select: {
          author: {
            select: {
              id: true,
              nickname: true,
            },
          },
          post: {
            select: {
              id: true,
              content: true,
              thumbnail: true,
              createdAt: true,
            },
          },
        },
      });
      return likedPosts;
    } catch (error) {
      throw error;
    }
  });
};

export default postsRoutes;
