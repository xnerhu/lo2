import { Request } from 'express';

import { IAppState } from '~/interfaces';

export interface IRequest extends Request {
  appState?: IAppState;
}
