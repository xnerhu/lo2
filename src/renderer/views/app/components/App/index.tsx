import { hot } from 'react-hot-loader/root';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Switch } from '../Switch';
import { Appbar } from '../Appbar';
import { Bottombar } from '../Bottombar';

import { Style } from '../../style';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Appbar />
        <Switch />
        <Bottombar />
      </StyledApp>
    </>
  );
};

export default hot(App);
