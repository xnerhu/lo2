import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToStaticMarkup } from 'react-dom/server';
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

    const html = renderToStaticMarkup(
      <ChunkExtractorManager extractor={extractor}>
        <StyleSheetManager sheet={sheet.instance}>
          <AppStateContext.Provider value={state}>
            <StaticRouter location={url} context={routerContext}>
              <App />
            </StaticRouter>
          </AppStateContext.Provider>
        </StyleSheetManager>
      </ChunkExtractorManager>,
    );

    const styleTags = sheet.getStyleTags();
    const scriptTags = extractor.getScriptTags();

    return htmlView(html, styleTags, scriptTags, state);
  }
}

export default new RendrerService();
