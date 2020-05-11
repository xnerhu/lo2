import { hot } from 'react-hot-loader/root';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import loadable, { Options } from '@loadable/component';

import { Switch } from '../Switch';
import { Appbar } from '../Appbar';
import { useResize } from '~/renderer/hooks/ui';
import { APPBAR_MOBILE_VIEW } from '~/renderer/constants/design';

import { Style } from '../../style';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const options: Options<any> = { ssr: true };

const LazyMobileNav = loadable(() => import('../MobileNav'), options);

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
        <Switch />
        <Mobile />
      </StyledApp>
    </>
  );
};

export default hot(App);
