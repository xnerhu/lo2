import { FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

import { IRequest } from '~/server/interfaces';

interface IOptions {
  redirectUrl?: string;
}

export default (options?: IOptions) => async (
  req: IRequest,
  res: FastifyReply<ServerResponse>,
  next: Function,
) => {
  const code = req.raw.tokenErrorCode;

  if (code != null) {
    if (options?.redirectUrl) {
      return res.redirect(options.redirectUrl);
    }

    res.code(code);

    throw new Error(
      code === 401
        ? 'Unauthorized: No token provided'
        : 'Unauthorized: Invalid token',
    );

    // res.code(code);

    // res.send({
    //   errorCode: code,
    //   success: false,
    //   message:
    // code === 401
    //   ? 'Unauthorized: No token provided'
    //   : 'Unauthorized: Invalid token',
    // });
  } else {
    return next();
  }
};
