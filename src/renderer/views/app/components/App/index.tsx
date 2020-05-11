import { hot } from 'react-hot-loader/root';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Switch } from '../Switch';
import { Appbar } from '../Appbar';
import { MobileNav } from '../MobileNav';

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
        <MobileNav />
      </StyledApp>
    </>
  );
};

export default hot(App);
