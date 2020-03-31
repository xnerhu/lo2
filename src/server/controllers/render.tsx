import { Router } from 'express';
import { resolve } from 'path';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import { ChunkExtractor } from '@loadable/server';

import { StoreProvider, AppStateProvider } from '~/renderer/app/store';
import App from '~/renderer/app/components/App';
import { IRequest } from '~/server/interfaces';
import { htmlStartView, htmlEndView } from '~/server/views/html';

const statsFile = resolve('./build/client/static/loadable-stats.json');

const router = Router();

router.get('*', (req: IRequest, res, next) => {
  next();
  return;
  res.type('html').write(htmlStartView());

  const sheet = new ServerStyleSheet();
  const routerContext = {};

  const extractor = new ChunkExtractor({
    statsFile,
    entrypoints: ['app'],
  });

  const jsx = extractor.collectChunks(
    sheet.collectStyles(
      <StaticRouter location={req.originalUrl} context={routerContext}>
        <StoreProvider data={req.appState}>
          <AppStateProvider data={req.appState}>
            <App />
          </AppStateProvider>
        </StoreProvider>
      </StaticRouter>,
    ),
  );

  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));

  stream.pipe(res, { end: false });

  stream.on('end', () =>
    res.end(htmlEndView(extractor.getScriptTags(), req.appState)),
  );

  next();
});

export default router;
