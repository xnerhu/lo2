import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import loadable, { Options } from '@loadable/component';

import { Appbar } from '../Appbar';
import { Footer } from '../Footer';
import { Style } from '~/renderer/app/style';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const options: Options<any> = { ssr: true };

const LazyHome = loadable(() => import('../Home'), options);
const LazyNews = loadable(() => import('../News'), options);
const LazyArticle = loadable(() => import('../Article'), options);
const LazyAbout = loadable(() => import('../About'), options);
const LazyTeachers = loadable(() => import('../Teachers'), options);
const LazyPatron = loadable(() => import('../Patron'), options);
const LazyHistory = loadable(() => import('../History'), options);
const LazyContact = loadable(() => import('../Contact'), options);

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Appbar />
        <Switch>
          <Route path="/contact" component={LazyContact} />
          <Route path="/history" component={LazyHistory} />
          <Route path="/patron" component={LazyPatron} />
          <Route path="/teachers" component={LazyTeachers} />
          <Route path="/about" component={LazyAbout} />
          <Route path="/article/:label" component={LazyArticle} />
          <Route path="/news/:categoryLabel?/:page?" component={LazyNews} />
          <Route path="/" component={LazyHome} />
        </Switch>
      </StyledApp>
      <Footer />
    </>
  );
};

export default hot(App);
