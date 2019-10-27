import { css } from 'styled-components';

import { body2, robotoRegular, noUserSelect, robotoMedium, h6, h5, h4, h3, h2, h1 } from '~/renderer/mixins';
import { BACKGROUND_COLOR } from '../constants';

export const Style = css`
  body {
    width: 100vw;
    height: 100vh;
    cursor: default;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: ${BACKGROUND_COLOR};
    color: #000;
    ${body2()};
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
  }

  * {
    box-sizing: border-box;
  }

  @keyframes skeleton-animation {
    0% {
      left: -100%;
    }
    100% {
      left: 100%
    }
  }

  a {
    font-size: 16px;
    text-decoration: none;
    color: #000;
    ${robotoRegular()};
    ${noUserSelect()};
  }

  b {
    ${body2()};
    ${robotoMedium()};
  }

  h6, h5, h4, h3, h2, h1 {
    margin: 0;
  }

  h6 {
    ${h6()};
  }

  h5 {
    ${h5()};
  }

  h4 {
    ${h4()};
  }

  h3 {
    ${h3()};
  }
  
  h2 {
    ${h2()};
  }

  h1 {
    ${h1()};
  }

  ::selection {
    background: #F61050;
    color: #fff;
  }
`;
