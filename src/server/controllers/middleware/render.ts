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
  const data =
    item && (await resolver(item, req.params, req.raw.tokenPayload, req.query));

  const appState: IAppState = {
    [item]: data,
    signedIn: !!req.raw.tokenPayload,
    user: req.raw.tokenPayload,
  };

  res.type('text/html');

  RenderService.render(req.raw.url, appState, res.res);
};
