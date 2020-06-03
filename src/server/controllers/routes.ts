import { FastifyInstance, RouteShorthandOptions } from 'fastify';

import useRender from './middleware/render';
import { IAppStateItem } from '~/interfaces';
import useAuth from './middleware/auth';

const routeFactory = (app: FastifyInstance) => (
  path: string | string[],
  item?: IAppStateItem,
  opts: RouteShorthandOptions = {},
) => {
  if (typeof path === 'string') {
    path = [path];
  }

  path.forEach((r) => {
    app.get(r, opts, useRender(item));
  });
};

export default (app: FastifyInstance) => {
  const handler = routeFactory(app);

  const authOpts: RouteShorthandOptions = {
    preValidation: useAuth({ redirectUrl: '/' }),
  };

  handler('/cms/article/:label', 'editArticle', authOpts);
  handler('/cms/article', 'addArticle', authOpts);

  handler('/artykul/:label', 'article');

  // https://github.com/fastify/fastify/issues/1206
  handler(['/blog', '/blog/:category', '/blog/:category/:page'], 'articles');

  handler('/', 'home');
  handler('*');
};
