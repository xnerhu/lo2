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

    res.send({
      errorCode: code,
      success: false,
      message:
        code === 401
          ? 'Unauthorized: No token provided'
          : 'Unauthorized: Invalid token',
    });
  } else {
    return next();
  }
};
