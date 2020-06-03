import { Worker, MessageChannel } from 'worker_threads';
import { Writable } from 'stream';

import { config } from '../constants/config';
import {
  IWorkerRenderReq,
  IWorkerRenderRes,
  IRenderOptions,
} from '~/interfaces';

class RendrerService {
  private worker = new Worker(config.workerPath);

  public render(options: IRenderOptions, stream: Writable) {
    const { port1, port2 } = new MessageChannel();

    const end = () => {
      port1.close();
      port2.close();
      port1.removeAllListeners();
      port2.removeAllListeners();

      stream.end();
    };

    port1.on('message', (e: IWorkerRenderRes) => {
      if (e.finished) return end();
      stream.write(e.data);
    });

    this.worker.postMessage(
      { scope: 'render', data: options, port: port2 } as IWorkerRenderReq,
      [port2],
    );
  }
}

export default new RendrerService();
