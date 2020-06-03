import { FastifyInstance } from 'fastify';

import { config } from '~/server/constants';

export default (app: FastifyInstance) => {
  app.setErrorHandler((error, req, res) => {
    let message: any = {
      success: false,
      errorMessage: error.message,
    };

    if (config.dev) {
      message = { ...message, errorStack: error.stack };
    }

    res.send(message);

    if (config.dev) {
      throw error;
    }
  });
};
