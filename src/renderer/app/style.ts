import { css } from 'styled-components';

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
} from '../mixins/typography';
import { noTapHighlight, noUserSelect } from '../mixins/user-selection';

export const Style = css`
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #fff;
    color: #000;
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    ${body2()};
    ${noTapHighlight()};
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
`;
