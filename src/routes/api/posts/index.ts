import { FastifyPluginAsync } from 'fastify';
import { prisma } from '../../../lib/db';

const postsRoute: FastifyPluginAsync = async (fastify) => {
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
              postTags: {
                select: {
                  tag: {
                    select: {
                      content: true,
                    },
                  },
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
      content: string;
      thumbnail: string;
      authorId: number;
      tags?: string[];
    };
  }>('/', async (request, reply) => {
    const { content, thumbnail, authorId, tags } = request.body;
    console.log(content, thumbnail, authorId, tags);

    try {
      const newPost = await prisma.post.create({
        data: {
          content,
          thumbnail,
          authorId,
          postTags: {
            create:
              tags?.map((tagName) => ({
                tag: {
                  connectOrCreate: {
                    where: {
                      content: tagName,
                    },
                    create: {
                      content: tagName,
                    },
                  },
                },
              })) || [],
          },
        },
      });
      return newPost;
    } catch (error) {
      throw error;
    }
  });

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

export default postsRoute;
