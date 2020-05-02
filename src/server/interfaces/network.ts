import { FastifyRequest } from 'fastify';
import { IncomingMessage } from 'http';

import { IAppState } from '~/interfaces';

export type IIncomingMessage = IncomingMessage & {
  appState?: IAppState;
};

export interface IRequest extends FastifyRequest {
  raw: IIncomingMessage;
}
