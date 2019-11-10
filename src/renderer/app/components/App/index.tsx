import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Route, Switch, withRouter, RouteProps } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { useStore } from '~/renderer/app/store';
import { RoutePage } from '~/renderer/components/RoutePage';
import { Appbar } from '../Appbar';
import { Footer } from '../Footer';
import { Style } from '~/renderer/app/style';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

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
          <Route path="/about/patron" component={RoutePage('About/Patron')} />
          <Route path="/about/articles" component={RoutePage('About/Press')} />
          <Route path="/about/teachers" component={RoutePage('About/Teachers')} />
          <Route path="/about/history" component={RoutePage('About/History')} />
          <Route path="/about" component={RoutePage('About')} />
          <Route path="/students" component={RoutePage('Students')} />
          <Route path="/news/:id" component={RoutePage('Article')} />
          <Route path="/news" component={RoutePage('News')} />
          <Route path="/gallery/:year/:album" component={RoutePage('GalleryView')} />
          <Route path="/gallery" component={RoutePage('Gallery')} />
          <Route path="/contact" component={RoutePage('Contract')} />
          <Route path="/" component={RoutePage('Home')} />
        </Switch>
      </StyledApp>
      <Footer />
    </>
  );
});

export default hot(App);
