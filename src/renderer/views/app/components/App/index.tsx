import { hot } from 'react-hot-loader/root';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Switch } from '../Switch';
import { Appbar } from '../Appbar';
import { MobileNav } from '../MobileNav';
import { useResize } from '~/renderer/hooks/ui';
import { APPBAR_MOBILE_VIEW } from '~/renderer/constants/design';

import { Style } from '../../style';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const Mobile = () => {
  const [visible] = useResize(APPBAR_MOBILE_VIEW);

  console.log(visible);

  return <MobileNav />;
};

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Appbar />
        <Switch />
        <Mobile />
      </StyledApp>
    </>
  );
};

export default hot(App);
