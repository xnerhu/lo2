import { Worker, MessageChannel } from 'worker_threads';
import { Writable } from 'stream';

import { config } from '../constants/config';
import {
  IAppState,
  IWorkerRenderRequest,
  IWorkerRenderResponse,
} from '~/interfaces';

class RendrerService {
  private worker = new Worker(config.workerPath);

  public render(url: string, appState: IAppState, stream: Writable) {
    const { port1, port2 } = new MessageChannel();

    const end = () => {
      port1.close();
      port2.close();
      port1.removeAllListeners();
      port2.removeAllListeners();

      stream.end();
    };

    port1.on('message', (e: IWorkerRenderResponse) => {
      if (e.data == null) return end();
      stream.write(e.data);
    });

    this.worker.postMessage(
      {
        type: 'render',
        data: { url, appState },
        port: port2,
      } as IWorkerRenderRequest,
      [port2],
    );
  }
}

export default new RendrerService();
