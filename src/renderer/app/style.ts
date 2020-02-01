import { css } from 'styled-components';

import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  transparency,
  icons,
} from '../constants';
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
  centerIcon,
} from '~/renderer/mixins';

export const Style = css`
  html,
  body {
    width: 100%;
    height: 100%;
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

    &.article-link {
      cursor: pointer;
      color: #3f51b5;
      padding-bottom: 2px;
      text-decoration: underline;
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

  code {
    background-color: rgba(0, 0, 0, 0.08);
  }

  blockquote {
    color: rgba(0, 0, 0, ${transparency.text.medium});

    &::before {
      content: '';
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 4px;
      background-image: url(${icons.formatQuote});
      opacity: ${transparency.icons.disabled};
      ${centerIcon()};
      ${noUserSelect()}
    }
  }

  p {
    &.align-left {
      text-align: left;
    }

    &.align-center {
      text-align: center;
    }

    &.align-right {
      text-align: right;
    }
  }

  span {
    &.color-highlight {
      color: ${PRIMARY_COLOR};
    }
  }

  img {
    &.article-image {
      display: block;
      max-width: 100%;
      max-height: 20em;
      margin-left: auto;
      margin-right: auto;
      border-radius: 16px;
    }
  }

  ::selection {
    background: ${PRIMARY_COLOR};
    color: #fff;
  }
`;
