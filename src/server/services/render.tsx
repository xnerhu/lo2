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
  public render(url: string, appState: IAppState) {
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
            <AppStateContext.Provider value={appState}>
              <App />
            </AppStateContext.Provider>
          </StaticRouter>
        </StyleSheetManager>
      </ChunkExtractorManager>,
    );

    const styles = sheet.getStyleTags();
    const scripts = extractor.getScriptTags();
    const state = JSON.stringify(appState);

    sheet.seal();

    return htmlView({ html, styles, scripts, state });
  }
}

export default new RendrerService();
