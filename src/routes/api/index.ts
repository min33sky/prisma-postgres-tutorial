import { FastifyPluginAsync } from 'fastify';
import postsRoute from './posts';
import tagsRoute from './tags';
import usersRoute from './users';

const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(usersRoute, { prefix: '/users' });
  fastify.register(postsRoute, { prefix: '/posts' });
  fastify.register(tagsRoute, { prefix: '/tags' });
};

export default api;
