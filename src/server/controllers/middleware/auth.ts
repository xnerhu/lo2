import { FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

import { IRequest } from '~/server/interfaces';

export default (redirectUrl?: string) => async (
  req: IRequest,
  res: FastifyReply<ServerResponse>,
  next: Function,
) => {
  const code = req.raw.tokenErrorCode;

  if (code != null) {
    if (redirectUrl) {
      return res.redirect(redirectUrl);
    }

    res.code(code);

    if (code === 401) res.send('Unauthorized: No token provided');
    if (code === 403) res.send('Unauthorized: Invalid token');
  } else {
    return next();
  }
};
