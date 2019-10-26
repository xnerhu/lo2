import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { Home } from '../Home';
import { About } from '../About';
import { AboutPatron } from '../About/Patron';
import { Press } from '../About/Press';
import { Teachers } from '../About/Teachers';
import { History } from '../About/History';
import { Students } from '../Students';

import { Appbar } from '../Appbar';
import { Footer } from '../Footer';
import { Style } from '~/renderer/app/style';
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
          <Route path="/about/press" component={Press} />
          <Route path="/about/teachers" component={Teachers} />
          <Route path="/about/history" component={History} />
          <Route path="/students" component={Students} />
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </StyledApp>
      <Footer />
    </>
  );
};

export default hot(App);
