import { parentPort } from 'worker_threads';

import {
  IWorkerMessage,
  IWorkerRenderRequest,
  IWorkerRenderResponse,
} from '~/interfaces';
import { render } from './render';

parentPort.on('message', (e: IWorkerMessage) => {
  const { type, port } = e;

  if (type === 'render') {
    const { url, appState } = (e as IWorkerRenderRequest).data;

    const html = render(url, appState);

    port.postMessage({
      type: 'render',
      data: html,
    } as IWorkerRenderResponse);
  }
});
