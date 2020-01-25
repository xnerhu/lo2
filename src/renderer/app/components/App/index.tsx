import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Route, Switch, withRouter, RouteProps } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import loadable, { Options } from '@loadable/component';

import { useStore } from '~/renderer/app/store';
import { Appbar } from '../Appbar';
import { Footer } from '../Footer';
import { Style } from '~/renderer/app/style';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const options: Options<any> = { ssr: true };

const LazyHome = loadable(() => import('../Home'), options);
const LazyNews = loadable(() => import('../News'), options);
const LazyArticle = loadable(() => import('../Article'), options);
const LazyGallery = loadable(() => import('../Gallery'), options);
const LazyAlbum = loadable(() => import('../Album'), options);
const LazyTeachers = loadable(() => import('../Teachers'), options);
const LazyPatron = loadable(() => import('../Patron'), options);
const LazyHistory = loadable(() => import('../History'), options);
const LazyContact = loadable(() => import('../Contact'), options);

const App = withRouter((props: RouteProps) => {
  const store = useStore();
  const { location } = props;
  const { pathname } = location;

  React.useEffect(() => {
    store.fetch(pathname);
  }, [pathname]);

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
          <Route path="/gallery/:_id" component={LazyAlbum} />
          <Route path="/gallery" component={LazyGallery} />
          <Route path="/article/:id" component={LazyArticle} />
          <Route path="/news/:categoryLabel?/:page?" component={LazyNews} />
          <Route path="/" component={LazyHome} />
        </Switch>
      </StyledApp>
      <Footer />
    </>
  );
});

export default hot(App);
