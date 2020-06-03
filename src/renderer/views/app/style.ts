import { css } from 'styled-components';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '~/renderer/constants/colors';
import { noTapHighlight } from '~/renderer/mixins/user-selection';
import { noButtons } from '~/renderer/mixins/scroll';
import {
  body2,
  robotoRegular,
  robotoMedium,
  h6,
  h5,
  h4,
  h3,
  h2,
  h1,
} from '~/renderer/mixins/typography';

export const Style = css`
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #fafafc;
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
    color: ${PRIMARY_COLOR};
    text-decoration: none;
    color: #000;
    ${robotoRegular()};

    &.underline {
      &:hover {
        text-decoration: underline;
      }
    }
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
    background: ${SECONDARY_COLOR};
    color: #fff;
  }
`;
