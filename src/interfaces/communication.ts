import { MessagePort } from 'worker_threads';

export interface IWorkerMessage {
  type: 'render';
  data?: any;
  port: MessagePort;
}

export interface IWorkerRenderRequest extends IWorkerMessage {
  data: {
    url: string;
    appState: any;
  };
}

export interface IWorkerRenderResponse extends IWorkerMessage {
  data?: string;
}
