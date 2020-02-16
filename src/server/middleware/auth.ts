import { Response, NextFunction } from 'express';

import { verifyAccessToken } from '../utils';
import { IRequest } from '../interfaces';

export const withAuth = (redirect?: string, throwError = true) => async (
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
      if (throwError) {
        res.status(401).send({ success: false, error });
      } else {
        next();
      }
    } else {
      res.redirect(redirect);
    }
  }
};

export const withAuthNoError = withAuth(null, false);
