import { Response, NextFunction } from 'express';

import { IRequest } from '../interfaces';
import AuthService from '../services/auth';

export const useAuth = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = await AuthService.verifyToken(req);

    req.appState = { ...req.appState, user };
    req.user = user;
  } catch (err) {
    req.authError = err;
  }

  next();
};

export const withAuth = () => async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user || req.authError) {
    res.status(401).send({ success: false, error: req.authError.message });
  } else {
    next();
  }
};
