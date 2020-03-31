import { Request, Response, NextFunction } from 'express';

type ICallback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any> | any;

export const handleRoute = (cb: ICallback) => async (
  req: Request,
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
