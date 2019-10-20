import { css } from 'styled-components';

import { body2 } from '~/renderer/mixins';

export const Style = css`
  body {
    width: 100vw;
    height: 100vh;
    user-select: none;
    cursor: default;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;
    color: #000;
    ${body2()};
  }

  * {
    box-sizing: border-box;
  }
`;
