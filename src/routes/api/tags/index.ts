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
};

export default tagsRoute;
