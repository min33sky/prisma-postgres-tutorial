import { FastifyPluginAsync } from 'fastify';
import { prisma } from '../../../lib/db';

const tagsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    try {
      const tags = prisma.tag.findMany({
        orderBy: {
          id: 'desc',
        },
      });

      return tags;
    } catch (error) {
      throw error;
    }
  });

  fastify.get('/agr', async (request, reply) => {
    //? 이 앱에선 별 의미 없는 쿼리임 ㅋㅋ
    try {
      const agr = prisma.tag.aggregate({
        _count: true,
        _avg: {
          id: true,
        },
        _max: {
          id: true,
        },
      });

      return agr;
    } catch (error) {
      throw error;
    }
  });
};

export default tagsRoute;
