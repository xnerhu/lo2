import { Response, NextFunction } from 'express';

import { IRequest } from '../interfaces';

type ICb = (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => Promise<any> | any;

export const handleRoute = (cb: ICb) => async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await cb(req, res, next);

    res.json(data);
  } catch (err) {
    res.status(err.status || 500);
    res.json({ success: false, error: err.message });
  }
};

export const handlePageRoute = (cb: ICb) => async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const data = await cb(req, res, next);

  req.appState = { ...req.appState, ...data };
};
