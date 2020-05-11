import styled, { css } from 'styled-components';

import { Content } from '~/renderer/components/Section';
import { Link } from '~/renderer/components/Link';
import { PRIMARY_COLOR } from '~/renderer/constants/design';
import { robotoMedium } from '~/renderer/mixins/typography';

export const StyledAppbar = styled(Content)`
  height: 128px;
  display: flex;
  align-items: center;
`;

export const Banner = styled.img`
  height: 64px;
`;

export const Container = styled.div`
  margin-left: auto;
`;

export const StyledNavItem = styled(Link)`
  padding: 12px;
  font-size: 16px;
  will-change: color;
  transition: 0.1s color;

  ${({ selected }: { selected: boolean }) =>
    selected &&
    css`
      ${robotoMedium()};
    `}

  &:first-child {
    margin-left: auto;
  }

  &:hover {
    color: ${PRIMARY_COLOR};
  }
`;
