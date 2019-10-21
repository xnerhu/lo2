import { css } from 'styled-components';

import { body2, robotoRegular, noUserSelect } from '~/renderer/mixins';

export const Style = css`
  body {
    width: 100vw;
    height: 100vh;
    cursor: default;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;
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

  ::selection {
    background: #F61050;
    color: #fff;
  }
`;
