import styled, { css } from 'styled-components';
import { Link } from '~/renderer/components/Link';

import { transparency } from '~/renderer/constants';
import { Content } from '~/renderer/components/Section';

export const StyledAppbar = styled(Content)`
  height: 128px;
  display: flex;
  align-items: center;
`;

export const MenuItems = styled.nav`
  margin-left: auto;
  display: flex;
`;

export const StyledMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 64px;
  white-space: nowrap;
  transition: 0.1s background-color;
  color: rgba(0, 0, 0, ${transparency.text.high});

  ${({ selected }: { selected: boolean }) => css`
    font-weight: ${selected ? 500 : 400};
  `}

  &:hover {
    background-color: #f5f5f5;
  }
`;
