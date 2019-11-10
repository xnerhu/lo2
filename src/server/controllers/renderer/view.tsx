import { Router } from 'express';
import { resolve } from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { ChunkExtractor } from '@loadable/server';

import { StoreProvider } from '~/renderer/app/store';
import { Html } from '~/server/components/Html';
import App from '~/renderer/app/components/App';
import { IRequest } from '~/server/interfaces/req';

const statsFile = resolve('./build/client/static/loadable-stats.json');

const router = Router();

router.get('*', (req: IRequest, res, next) => {
  const sheet = new ServerStyleSheet();
  const routerContext = {};
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ["app"] });

  const Content = extractor.collectChunks(
    <StaticRouter location={req.originalUrl} context={routerContext}>
      <StyleSheetManager sheet={sheet.instance}>
        <StoreProvider data={req.appState}>
          <App />
        </StoreProvider>
      </StyleSheetManager>
    </StaticRouter>
  );

  const html = renderToString(Content);

  const str = renderToString(
    <Html scripts={extractor.getScriptElements()} styles={sheet.getStyleElement()} state={req.appState}>
      {html}
    </Html>
  );

  res.send(`<!doctype html>${str}`);

  next();
});

export default router;
