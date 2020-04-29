import React from 'react';
import { renderToString } from 'react-dom/server';
import { FastifyInstance } from 'fastify';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { StaticRouter } from 'react-router';

import config from '../config';
import htmlView from '../views/html';
import App from '~/renderer/views/app';

export default (app: FastifyInstance) => {
  app.get('*', (req, res) => {
    res.type('text/html');

    const sheet = new ServerStyleSheet();
    const routerContext = {};

    const extractor = new ChunkExtractor({
      statsFile: config.statsFile,
      entrypoints: ['app'],
    });

    try {
      const Page = (
        <ChunkExtractorManager extractor={extractor}>
          <StyleSheetManager sheet={sheet.instance}>
            <StaticRouter location={req.raw.url} context={routerContext}>
              <App />
            </StaticRouter>
          </StyleSheetManager>
        </ChunkExtractorManager>
      );

      const html = renderToString(Page);
      const appState = {};

      const styleTags = sheet.getStyleTags();
      const scriptTags = extractor.getScriptTags();

      res.send(htmlView(html, styleTags, scriptTags, appState));

      sheet.seal();
    } catch (error) {
      console.error(error);
    }
  });
};
