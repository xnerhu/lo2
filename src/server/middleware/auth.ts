import { Response, NextFunction } from 'express';

import { verifyAccessToken } from '../utils';
import { IRequest } from '../interfaces';

export const withAuth = (redirect?: string) => async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = await verifyAccessToken(req);
    req.user = user;
    next();
  } catch (error) {
    if (!redirect) {
      res.status(401).send({ success: false, error });
    } else {
      res.redirect(redirect);
    }
  }
};
