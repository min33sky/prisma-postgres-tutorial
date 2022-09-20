import { FastifyPluginAsync } from 'fastify';
import postsRoutes from './posts';
import usersRoute from './users';

const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(usersRoute, { prefix: '/users' });
  fastify.register(postsRoutes, { prefix: '/posts' });
};

export default api;
