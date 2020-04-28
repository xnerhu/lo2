import { resolve } from 'path';
import { FastifyInstance } from 'fastify';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { ChunkExtractor } from '@loadable/server';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { htmlStartView, htmlEndView } from '../views/html';
import App from '~/renderer/app/components/App';

const statsFile = resolve('./build/client/static/loadable-stats.json');

export default (app: FastifyInstance) => {
  app.get('*', (req, res) => {
    res.type('text/html');

    res.res.write(htmlStartView);

    const sheet = new ServerStyleSheet();
    const routerContext = {};

    const extractor = new ChunkExtractor({
      statsFile,
      entrypoints: ['app'],
    });

    const jsx = extractor.collectChunks(
      sheet.collectStyles(
        <StaticRouter location={req.raw.url} context={routerContext}>
          <App />
        </StaticRouter>,
      ),
    );

    const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));

    stream.pipe(res.res, { end: false });

    stream.on('end', () =>
      res.res.end(htmlEndView(extractor.getScriptTags(), {})),
    );
  });
};
