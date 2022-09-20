import Fastify from 'fastify';
import dotenv from 'dotenv';
import routes from './routes';
// import cors from '@fastify/cors';
dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const server = Fastify({
  logger: true,
});

// server.register(cors, {
//   origin: process.env.CLIENT_URL,
//   credentials: true,
// });

server.register(routes);

server.listen({
  port: PORT,
});
