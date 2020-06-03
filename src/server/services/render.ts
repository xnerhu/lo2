import { Worker, MessageChannel } from 'worker_threads';

import { config } from '../constants/config';
import {
  IAppState,
  IWorkerRenderRequest,
  IWorkerRenderResponse,
} from '~/interfaces';

class RendrerService {
  private worker = new Worker(config.workerPath);

  public render(url: string, appState: IAppState) {
    return new Promise<string>((resolve) => {
      const { port1, port2 } = new MessageChannel();

      port1.on('message', (e: IWorkerRenderResponse) => {
        port1.close();
        port1.removeAllListeners();
        port2.close();
        port2.removeAllListeners();

        resolve(e.data);
      });

      this.worker.postMessage(
        {
          type: 'render',
          data: { url, appState },
          port: port2,
        } as IWorkerRenderRequest,
        [port2],
      );
    });
  }
}

export default new RendrerService();
