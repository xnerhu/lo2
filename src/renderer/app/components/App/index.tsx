import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { Home } from '../Home';
import { Appbar } from '../Appbar';
import { ContextMenu } from '../ContextMenu';
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
          <Route path="/" component={Home} />
        </Switch>
        <ContextMenu />
      </StyledApp>
    </>
  );
};

export default hot(App);
