import { FastifyInstance } from 'fastify';

import RendererService from '../services/renderer';
import { IRequest } from '../interfaces';

export default (app: FastifyInstance) => {
  app.get('*', (req: IRequest, res) => {
    res.type('text/html');

    const { raw } = req;
    const html = RendererService.render(raw.url, raw.appState);

    res.send(html);
  });
};
