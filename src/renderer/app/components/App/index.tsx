import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import loadable, { Options } from '@loadable/component';

import { Appbar } from '../Appbar';
import { Footer } from '../Footer';
import { Style } from '~/renderer/app/style';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const options: Options<any> = { ssr: true };

const LazyNotFound = loadable(() => import('../NotFound'), options);
const LazyHome = loadable(() => import('../Home'), options);
const LazyNews = loadable(() => import('../NewsV'), options);
// const LazyArticle = loadable(() => import('../Article'), options);
// const LazyAbout = loadable(() => import('../About'), options);
// const LazyStudents = loadable(() => import('../Students'), options);
// const LazyPersonnel = loadable(() => import('../Personnel'), options);
// const LazyPatron = loadable(() => import('../Patron'), options);
// const LazyHistory = loadable(() => import('../History'), options);
// const LazyContact = loadable(() => import('../Contact'), options);
// const LazyAddArticle = loadable(() => import('../AddArticle'), options);
// const LazyEditArticle = loadable(() => import('../EditArticle'), options);
// const LazyLogin = loadable(() => import('../Login'), options);
// const LazyChangePassword = loadable(() => import('../ChangePassword'), options);

// const Watcher = withRouter((props: IRouterProps) => {
//   const { pathname } = props.location;
//   const store = useStore();

//   React.useEffect(() => {
//     store.appbar.
//   }, [pathname]);

//   return null;
// });

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Appbar />
        <Switch>
          {/* <Route path="/change-password" component={LazyChangePassword} />
          <Route path="/login" component={LazyLogin} />
          <Route path="/edit-article/:label" component={LazyEditArticle} />
          <Route path="/add-article" component={LazyAddArticle} />
          <Route path="/contact" component={LazyContact} />
          <Route path="/history" component={LazyHistory} />
          <Route path="/patron" component={LazyPatron} />
          <Route path="/personnel" component={LazyPersonnel} />
          <Route path="/students" component={LazyStudents} />
          <Route path="/about" component={LazyAbout} />
  <Route path="/article/:label" component={LazyArticle} />*/}
          <Route path="/news/:categoryLabel?/:page?" component={LazyNews} />
          <Route path="/" component={LazyHome} exact />
          <Route component={LazyNotFound} />
        </Switch>
      </StyledApp>
      <Footer />
    </>
  );
};

export default hot(App);
