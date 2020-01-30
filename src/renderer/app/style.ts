import { css } from 'styled-components';

import { BACKGROUND_COLOR, PRIMARY_COLOR } from '../constants';
import {
  body2,
  robotoRegular,
  noUserSelect,
  robotoMedium,
  h6,
  h5,
  h4,
  h3,
  h2,
  h1,
  noTapHighlight,
  noButtons,
} from '~/renderer/mixins';

export const Style = css`
  body {
    width: 100%;
    height: 100%;
    cursor: default;
    margin: 0;
    padding: 0;
    background-color: ${BACKGROUND_COLOR};
    color: #000;
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    ${body2()};
    ${noTapHighlight()};
    ${noButtons({
      size: 10,
      color: 'rgba(0, 0, 0, 0.48)',
      hoverColor: 'rgba(0, 0, 0, 0.64)',
    })};
  }

  #app {
    width: 100%;
    height: 100%;
    height: -webkit-fill-available;
    display: flex;
    flex-direction: column;
  }

  * {
    box-sizing: border-box;
  }

  @keyframes skeleton-animation {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
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
    ${robotoMedium()};
  }

  h6,
  h5,
  h4,
  h3,
  h2,
  h1 {
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
    background: ${PRIMARY_COLOR};
    color: #fff;
  }
`;
