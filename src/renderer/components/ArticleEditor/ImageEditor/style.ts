import styled from 'styled-components';

import { centerIcon } from '~/renderer/mixins/images';
import {
  ICON_MAGNIFY_PLUS,
  ICON_MAGNIFY_MINUS,
} from '~/renderer/constants/icons';

export const ScaleContainer = styled.div`
  width: 100%;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &::before,
  &::after {
    content: '';
    width: 24px;
    height: 24px;
    opacity: 0.12;
    ${centerIcon()};
  }

  &::before {
    background-image: url(${ICON_MAGNIFY_MINUS});
  }

  &::after {
    background-image: url(${ICON_MAGNIFY_PLUS});
  }

  & > input {
    margin: 0 24px;
    flex: 1;
  }
`;

export const Canvas = styled.canvas`
  width: 100%;
  border-radius: 8px;
  margin-top: 32px;
`;
