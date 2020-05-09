import { FastifyRequest } from 'fastify';
import { IncomingMessage } from 'http';

import { IAppState, ITokenPayload } from '~/interfaces';

export type IIncomingMessage = IncomingMessage & {
  appState?: IAppState;
};

export interface IRequest extends FastifyRequest {
  raw: IIncomingMessage;
  tokenPayload: ITokenPayload;
  tokenErrorCode?: number;
}
