import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToNodeStream } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { ChunkExtractor } from '@loadable/server';

import { IAppState } from '~/interfaces';
import { config } from './constants';
import AppStateContext from '~/contextes/app-state';
import App from '~/renderer/views/app';
import { htmlViewStart, htmlViewEnd } from './views/html';

export const render = (
  url: string,
  appState: IAppState,
  onData: (data: string) => void,
  onFinish: () => void,
) => {
  onData(htmlViewStart);

  const sheet = new ServerStyleSheet();
  const routerContext = {};

  const extractor = new ChunkExtractor({
    statsFile: config.statsFile,
    entrypoints: ['app'],
  });

  const jsx = extractor.collectChunks(
    sheet.collectStyles(
      <StaticRouter location={url} context={routerContext}>
        <AppStateContext.Provider value={appState}>
          <App />
        </AppStateContext.Provider>
      </StaticRouter>,
    ),
  );

  const appStream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));

  appStream.on('data', (chunk: Buffer) => {
    onData(chunk.toString());
  });

  appStream.on('end', () => {
    sheet.seal();

    onData(
      htmlViewEnd({
        scripts: extractor.getScriptTags(),
        state: JSON.stringify(appState),
      }),
    );

    onFinish();
  });
};
