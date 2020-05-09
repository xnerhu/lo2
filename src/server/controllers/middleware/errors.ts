import { FastifyInstance } from 'fastify';

export default (app: FastifyInstance) => {
  app.setErrorHandler((error, req, res) => {
    res.send({
      success: false,
      errorMessage: error.message,
    });
  });
};
