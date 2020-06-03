import { MessagePort } from 'worker_threads';

export interface IWorkerMessage {
  scope: 'render';
  data?: any;
  port: MessagePort;
}

export interface IWorkerRenderReq extends IWorkerMessage {
  data: IRenderOptions;
}

export interface IWorkerRenderRes extends IWorkerMessage {
  chunk?: string;
  finished?: boolean;
}

export interface IRenderOptions {
  url: string;
  appState: any;
}
