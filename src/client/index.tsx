import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import { IAppState } from '~/interfaces';
import App from '~/renderer/app/components/App';

declare const window: {
  __APP_STATE__: IAppState;
};

loadableReady().then(() => {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('app'),
  );
});
