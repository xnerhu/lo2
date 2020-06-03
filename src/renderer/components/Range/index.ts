import styled from 'styled-components';

import { PRIMARY_COLOR } from '~/renderer/constants/design';
import { centerVertical } from '~/renderer/mixins/positioning';

export const Range = styled.input.attrs({ type: 'range' })`
  width: 100%;
  appearance: none;
  outline: none;
  border: none;

  &::-webkit-slider-runnable-track {
    height: 4px;
    background-color: rgba(0, 174, 239, 0.24);
    appearance: none;
    border-radius: 64px;
  }

  &::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    background-color: ${PRIMARY_COLOR};
    cursor: pointer;
    appearance: none;
    border-radius: 100%;
    position: relative;
    ${centerVertical()};
  }
`;
