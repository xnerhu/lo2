import { hot } from 'react-hot-loader/root';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import loadable from '@loadable/component';

import { useResize } from '~/renderer/hooks/ui';
import { APPBAR_MOBILE_VIEW } from '~/renderer/constants/design';
import { LOADABLE_OPTIONS } from '~/renderer/constants/loadable';
import { Switch } from '../Switch';
import { Appbar } from '../Appbar';
import { Footer } from '../Footer';

import { Style } from '../../style';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const LazyMobileNav = loadable(() => import('../MobileNav'), LOADABLE_OPTIONS);

const Mobile = () => {
  const [visible] = useResize(APPBAR_MOBILE_VIEW);
  if (!visible) return null;
  return <LazyMobileNav />;
};

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Appbar />
        <Mobile />
        <Switch />
        <Footer />
      </StyledApp>
    </>
  );
};

export default hot(App);
