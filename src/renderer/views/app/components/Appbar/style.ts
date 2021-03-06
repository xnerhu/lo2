import styled, { css } from 'styled-components';

import { Content } from '~/renderer/components/Section';
import { Link } from '~/renderer/components/Link';
import { PRIMARY_COLOR, APPBAR_MOBILE_VIEW } from '~/renderer/constants/design';
import { robotoMedium } from '~/renderer/mixins/typography';
import { noUserSelect } from '~/renderer/mixins/user-selection';

export const StyledAppbar = styled(Content)`
  height: 128px;
  display: flex;
  align-items: center;

  @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
    justify-content: center;
  }
`;

export const Banner = styled.img`
  max-width: 100%;
  height: 64px;
  ${noUserSelect()};
`;

export const Container = styled.div`
  margin-left: auto;

  @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
    display: none;
  }
`;

export const StyledNavItem = styled(Link)`
  padding: 12px;
  font-size: 16px;
  will-change: color;
  transition: 0.1s color;
  ${noUserSelect()};

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
