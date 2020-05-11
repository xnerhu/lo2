import { FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

import { IAppStateItem } from '~/interfaces';
import { IRequest } from '~/server/interfaces';
import resolver from '~/server/resolvers';
import RenderService from '~/server/services/render';

export default (item?: IAppStateItem) => async (
  req: IRequest,
  res: FastifyReply<ServerResponse>,
) => {
  const data = item && (await resolver(item, req.params));

  res.type('text/html');

  const { raw } = req;
  const html = RenderService.render(raw.url, { [item]: data });

  res.send(html);
};
