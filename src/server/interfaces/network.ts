import { FastifyRequest } from 'fastify';
import { IncomingMessage } from 'http';

import { IAppState, ITokenPayload } from '~/interfaces';

export type IIncomingMessage = IncomingMessage & {
  appState?: IAppState;
  tokenPayload: ITokenPayload;
  tokenErrorCode?: number;
};

export interface IRequest extends FastifyRequest {
  raw: IIncomingMessage;
}

export interface IQueryFilter {
  [key: string]: string;
}
