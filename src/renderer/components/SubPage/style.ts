import styled from 'styled-components';

import { Link } from '../Link';
import { CARD_SHADOW, PRIMARY_COLOR } from '~/renderer/constants/design';
import { ICON_LINK } from '~/renderer/constants/icons';
import { transparency } from '~/renderer/constants/transparency';
import { centerIcon } from '~/renderer/mixins/images';
import { Grid } from '../Section';

export const Container = styled(Grid)`
  padding-bottom: 48px;
`;

export const Item = styled(Link)`
  width: 100%;
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

  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    margin-right: 12px;
    background-image: url(${ICON_LINK});
    opacity: ${transparency.icons.disabled};
    ${centerIcon()};
  }
`;
