import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { Home } from '../Home';
import { About } from '../About';
import { AboutPatron } from '../Patron';
import { Appbar } from '../Appbar';
import { Style } from '~/renderer/app/style';
import { Footer } from '../Footer';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Appbar />
        <Switch>
          <Route path="/about/patron" component={AboutPatron} />
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </StyledApp>
      <Footer />
    </>
  );
};

export default hot(App);
