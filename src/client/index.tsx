import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import AppStateContext from '~/contextes/app-state';
import App from '~/renderer/views/app';

declare const window: {
  __APP_STATE__: any;
};

loadableReady().then(() => {
  const renderMethod =
    process.env.NODE_ENV === 'development' ? render : hydrate;

  renderMethod(
    <AppStateContext.Provider value={window.__APP_STATE__}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppStateContext.Provider>,
    document.getElementById('app'),
  );
});
