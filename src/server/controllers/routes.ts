import { FastifyInstance } from 'fastify';

import useRender from './middleware/render';
import { IAppStateItem } from '~/interfaces';

const routeFactory = (app: FastifyInstance) => (
  path: string,
  item?: IAppStateItem,
) => {
  app.get(path, useRender(item));
};

export default (app: FastifyInstance) => {
  const handler = routeFactory(app);

  handler('/articles', 'articles');
  handler('/', 'home');
  handler('*');
};
