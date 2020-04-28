import React from 'react';
import { FastifyInstance } from 'fastify';
import fetch from 'node-fetch';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { StaticRouter } from 'react-router';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';

import config from '../config';
import htmlView from '../views/html';
import App from '~/renderer/app/components/App';

export default (app: FastifyInstance) => {
  app.get('*', (req, res) => {
    res.type('text/html');

    const sheet = new ServerStyleSheet();
    const routerContext = {};

    const extractor = new ChunkExtractor({
      statsFile: config.statsFile,
      entrypoints: ['app'],
    });

    const client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: `http://localhost:${config.port}/graphql`,
        credentials: 'same-origin',
        headers: {
          cookies: req.headers.cookies,
        },
        fetch: fetch as any,
      }),
      cache: new InMemoryCache(),
    });

    try {
      const Page = (
        <ChunkExtractorManager extractor={extractor}>
          <StyleSheetManager sheet={sheet.instance}>
            <ApolloProvider client={client}>
              <StaticRouter location={req.raw.url} context={routerContext}>
                <App />
              </StaticRouter>
            </ApolloProvider>
          </StyleSheetManager>
        </ChunkExtractorManager>
      );

      getDataFromTree(Page).then((html) => {
        const appState = client.extract();
        const styleTags = sheet.getStyleTags();
        const scriptTags = extractor.getScriptTags();

        res.send(htmlView(html, styleTags, scriptTags, appState));

        sheet.seal();
      });
    } catch (error) {
      console.error(error);
    }
  });
};
