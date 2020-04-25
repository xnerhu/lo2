import { Response, NextFunction } from 'express';

import { IRequest } from '../interfaces';
import { IAppStatePage } from '~/interfaces';

export interface IParams {
  [key: string]: any;
}

type ICb = (params: IParams, req: IRequest) => Promise<any> | any;

export const handleRoute = (cb: ICb) => async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await cb(req.query, req);

    res.json(data);
  } catch (err) {
    res.status(err.status || 500);
    res.json({ success: false, error: err.message });
  }
};

export const handlePageRoute = (page: keyof IAppStatePage, cb: ICb) => async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const data = await cb(req.params, req);

  req.appState = {
    page: {
      ...req.appState?.page,
      [page]: data,
    },
  };

  next();
};
