import { FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

import { IAppStateItem, IAppState } from '~/interfaces';
import { IRequest } from '~/server/interfaces';
import resolver from '~/server/resolvers';
import RenderService from '~/server/services/render';

export default (item?: IAppStateItem) => async (
  req: IRequest,
  res: FastifyReply<ServerResponse>,
) => {
  const data = item && (await resolver(item, req.params));

  const appState: IAppState = {
    [item]: data,
    signedIn: !!req.raw.tokenPayload,
    user: req.raw.tokenPayload,
  };

  res.type('text/html');

  const { raw } = req;
  const html = RenderService.render(raw.url, appState);

  res.send(html);
};
