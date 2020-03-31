import { Request } from 'express';

import { IAppState, IUser } from '~/interfaces';

export interface IRequest extends Request {
  appState?: IAppState;
  user?: IUser;
  authError?: Error;
}
