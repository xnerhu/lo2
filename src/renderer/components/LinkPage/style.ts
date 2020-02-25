import styled from 'styled-components';

import { Link } from '../Link';
import {
  CARD_SHADOW,
  icons,
  transparency,
  PRIMARY_COLOR,
} from '~/renderer/constants';
import { centerIcon } from '~/renderer/mixins';

export const Card = styled(Link)`
  width: 100%;
  max-width: 344px;
  height: 64px;
  background-color: #fff;
  border-radius: 8px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  font-size: 16px;
  box-shadow: ${CARD_SHADOW};
  transition: 0.1s box-shadow;

  &:hover {
    background-color: #fff;
    box-shadow: 0 0 0 2px ${PRIMARY_COLOR};
  }

  &:not(:first-child) {
    margin-top: 32px;
  }

  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    margin-right: 12px;
    background-image: url(${icons.link});
    opacity: ${transparency.icons.disabled};
    ${centerIcon()};
  }
`;
