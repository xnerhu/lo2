import { FastifyInstance } from 'fastify';

import clientRouter from './client';

export default (app: FastifyInstance) => {
  clientRouter(app);
};
