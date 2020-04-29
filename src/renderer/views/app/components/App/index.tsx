import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import loadable, { Options } from '@loadable/component';

import { Style } from '../../style';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const options: Options<any> = { ssr: true };

const LazyHome = loadable(() => import('~/renderer/views/home'), options);
const LazyArticles = loadable(
  () => import('~/renderer/views/articles'),
  options,
);

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Switch>
          <Route path="/articles" component={LazyArticles} />
          <Route path="/" component={LazyHome} exact />
        </Switch>
      </StyledApp>
    </>
  );
};

export default hot(App);
