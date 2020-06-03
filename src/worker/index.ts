import { parentPort } from 'worker_threads';

import { IWorkerMessage, IWorkerRenderRes } from '~/interfaces';
import { render } from './render';

parentPort.on('message', (e: IWorkerMessage) => {
  const { scope, port } = e;

  if (scope === 'render') {
    const onData = (chunk: string) => {
      port.postMessage({ scope: 'render', data: chunk } as IWorkerRenderRes);
    };

    const onFinish = () => {
      port.postMessage({ scope: 'render', finished: true } as IWorkerRenderRes);
    };

    render(e.data, onData, onFinish);
  }
});
