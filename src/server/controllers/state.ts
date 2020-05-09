import { FastifyInstance } from 'fastify';
import { ServerResponse } from 'http';

import { IAppStateItem } from '~/interfaces';
import resolver from '~/server/resolvers';
import { IIncomingMessage } from '~/server/interfaces';

interface Item {
  path: string;
  name: IAppStateItem;
}

const map: Item[] = [
  {
    path: '/',
    name: 'home',
  },
  {
    path: '/articles',
    name: 'articles',
  },
];

const registry = (app: FastifyInstance) => (item: Item) => {
  app.use(
    item.path,
    async (req: IIncomingMessage, res: ServerResponse, next: Function) => {
      const data = await resolver(item.name);

      if (data) {
        req.appState = { [item.name]: data };
      }

      next();
    },
  );
};

export default (app: FastifyInstance) => {
  map.forEach(registry(app));
};
