import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from '~/renderer/app/components/App';

declare const window: {
  __APP_STATE__: any;
};

export const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache().restore(window.__APP_STATE__),
});

loadableReady().then(() => {
  hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('app'),
  );
});
