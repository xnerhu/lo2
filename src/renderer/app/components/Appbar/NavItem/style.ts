import styled, { css } from 'styled-components';

import { Link } from '~/renderer/components/Link';
import { transparency, icons, APPBAR_MOBILE_VIEW } from '~/renderer/constants';
import { centerIcon } from '~/renderer/mixins';

const NavItemHover = css`
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const StyledNavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 64px;
  font-size: 18px;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  color: rgba(0, 0, 0, ${transparency.text.high});
  transition: 0.1s background-color;

  ${({
    selected,
    hasSubpages,
  }: {
    selected: boolean;
    hasSubpages: boolean;
  }) => css`
    font-weight: ${selected ? 500 : 400};

    ${!hasSubpages && NavItemHover}

    ${hasSubpages &&
      css`
        @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
          ${NavItemHover}
        }
      `}
  `}

  @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
    width: calc(100% - 24px);
    margin: 0 auto;
    display: block;
    text-align: center;

    &:not(:first-child) {
      margin-top: 16px;
      }

    & .nav-menu {
      display: none;
    }
  }

  &:hover .nav-menu {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const ExpandIcon = styled.div`
  width: 20px;
  height: 20px;
  opacity: ${transparency.icons.disabled};
  background-image: url(${icons.chevron});
  margin-left: 4px;
  margin-right: 4px;
  transform: rotate(90deg);
  border-radius: 100%;
  ${centerIcon(20)};

  @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
    display: none;
  }
`;
