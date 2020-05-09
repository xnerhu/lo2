import { FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

import { IAppStateItem } from '~/interfaces';
import { IRequest } from '~/server/interfaces';
import resolver from '~/server/resolvers';
import RendererService from '~/server/services/renderer';

export default (item?: IAppStateItem) => async (
  req: IRequest,
  res: FastifyReply<ServerResponse>,
) => {
  const appState = item && (await resolver(item));

  res.type('text/html');

  const { raw } = req;
  const html = RendererService.render(raw.url, appState);

  res.send(html);
};
