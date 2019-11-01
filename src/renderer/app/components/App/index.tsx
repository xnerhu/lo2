import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Route, Switch, withRouter, RouteProps } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { Home } from '../Home';
import { About } from '../About';
import { AboutPatron } from '../About/Patron';
import { Press } from '../About/Press';
import { Teachers } from '../About/Teachers';
import { History } from '../About/History';
import { Students } from '../Students';
import { Contact } from '../Contact';
import { Gallery } from '../Gallery';
import { GalleryView } from '../Gallery/GalleryView';

import { useStore } from '~/renderer/app/store';
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
          <Route path="/about/patron" component={AboutPatron} />
          <Route path="/about/articles" component={Press} />
          <Route path="/about/teachers" component={Teachers} />
          <Route path="/about/history" component={History} />
          <Route path="/students" component={Students} />
          <Route path="/about" component={About} />
          <Route path="/gallery/:year/:album" component={GalleryView} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/contact" component={Contact} />
          <Route path="/" component={Home} />
        </Switch>
      </StyledApp>
      <Footer />
    </>
  );
});

export default hot(App);
