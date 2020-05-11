import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import { config } from '../constants/config';
import App from '~/renderer/views/app';
import htmlView from '../views/html';
import { IAppState } from '~/interfaces';
import AppStateContext from '~/contextes/app-state';

class RendrerService {
  public render(url: string, state: IAppState) {
    const sheet = new ServerStyleSheet();
    const routerContext = {};

    const extractor = new ChunkExtractor({
      statsFile: config.statsFile,
      entrypoints: ['app'],
    });

    const html = renderToString(
      <ChunkExtractorManager extractor={extractor}>
        <StyleSheetManager sheet={sheet.instance}>
          <StaticRouter location={url} context={routerContext}>
            <AppStateContext.Provider value={state}>
              <App />
            </AppStateContext.Provider>
          </StaticRouter>
        </StyleSheetManager>
      </ChunkExtractorManager>,
    );

    const styleTags = sheet.getStyleTags();
    const scriptTags = extractor.getScriptTags();

    sheet.seal();

    return htmlView(html, styleTags, scriptTags, state);
  }
}

export default new RendrerService();
