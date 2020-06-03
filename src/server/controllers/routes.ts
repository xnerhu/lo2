import { FastifyInstance } from 'fastify';

import useRender from './middleware/render';
import { IAppStateItem } from '~/interfaces';

const routeFactory = (app: FastifyInstance) => (
  path: string | string[],
  item?: IAppStateItem,
) => {
  if (typeof path === 'string') {
    path = [path];
  }

  path.forEach((r) => {
    app.get(r, useRender(item));
  });
};

export default (app: FastifyInstance) => {
  const handler = routeFactory(app);

  handler('/cms/article/:label', 'editArticle');

  handler('/cms/article', 'addArticle');
  handler('/artykul/:label', 'article');

  // https://github.com/fastify/fastify/issues/1206
  handler(['/blog', '/blog/:category', '/blog/:category/:page'], 'articles');

  handler('/', 'home');
  handler('*');
};
