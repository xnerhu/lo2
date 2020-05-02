import { FastifyInstance } from 'fastify';
import { ServerResponse } from 'http';

import { IAppState } from '~/interfaces';
import { appStateResolver } from '~/server/resolvers/app-state';
import { IIncomingMessage } from '~/server/interfaces';

interface Item {
  path: string;
  name: keyof IAppState;
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
      const data = await appStateResolver(item.name);

      req.appState = data as any;

      next();
    },
  );
};

export default (app: FastifyInstance) => {
  map.forEach(registry(app));
};
