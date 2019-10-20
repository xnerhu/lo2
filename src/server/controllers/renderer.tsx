import { Router } from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import { StoreProvider } from '~/renderer/app/store';
import { IAppState } from '~/interfaces';
import { Html } from '../components/HTML';
import App from '~/renderer/app/components/App';

const router = Router();

const scripts = ['app.js', 'vendor.chunk.js'];
const sheet = new ServerStyleSheet();

router.get('*', (req, res, next) => {
  const routerContext = {};

  const appState: IAppState = {
    sliderItems: [
      {
        url: 'https://www.opole.pl/wp-content/uploads/2017/01/ZdjeciaOpole-37_mini.jpg'
      },
      {
        url: 'https://polskazachwyca.pl/wp-content/uploads/2017/08/opole-shutterstock_208011805-e1504275771713.jpg'
      },
      {
        url: 'https://www.opole.pl/wp-content/uploads/2018/04/miasto-opole-widok-z-ratusza.jpg',
      },
      {
        url: 'http://radio.opole.pl/public/info/2019/2019-07-24_156395853710.jpg',
      }
    ]
  }

  const content = renderToString(
    <StaticRouter location={req.baseUrl} context={routerContext}>
      <StyleSheetManager sheet={sheet.instance}>
        <StoreProvider data={appState}>
          <App />
        </StoreProvider>
      </StyleSheetManager>
    </StaticRouter>
  );

  const str = renderToString(
    <Html scripts={scripts} styleElement={sheet.getStyleElement()} state={appState}>
      {content}
    </Html>
  );

  res.send(`<!doctype html>${str}`);

  next();
});

export default router;
