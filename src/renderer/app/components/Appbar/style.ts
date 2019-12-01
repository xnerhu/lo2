import styled, { css } from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

import { h3, noUserSelect, centerIcon, robotoLight } from '~/renderer/mixins';
import { transparency, GRADIENT, icons, BACKGROUND_COLOR, NAVBAR_HEIGHT, MOBILE_VIEW, GRADIENT_VERTICAL } from '~/renderer/constants';

export const StyledAppbar = styled.div`
  margin-bottom: 32px;
  border-bottom: 1px solid rgba(0, 0, 0, ${transparency.dividers});
`;

export const Header = styled.header`
  padding: 32px 0px 24px;
  text-align: center;
  ${h3()};
  ${robotoLight()};

  @media(max-width: ${MOBILE_VIEW}px) {
    font-size: 32px;
    padding-bottom: 0px;
  }
`;

export const Navbar = styled.nav`
  width: 100%;
  height: ${NAVBAR_HEIGHT}px;
  display: flex;
  justify-content: center;
  background-color: ${BACKGROUND_COLOR};

  @media(max-width: ${MOBILE_VIEW}px) {
    height: fit-content;
    flex-direction: column;
    margin-top: 24px;

    ${({ expanded }: { expanded: boolean }) => css`
      display: ${expanded ? 'flex' : 'none'};
    `}
  }
`;

interface NavItemProps {
  selected: boolean;
  menuVisible: boolean;
  expanded: boolean;
}

export const StyledNavItem = styled.div`
  position: relative;

  ${({ menuVisible, expanded }: NavItemProps) => {
    return menuVisible && css`
      @media(max-width: ${MOBILE_VIEW}px) {
        & .nav-menu {
          opacity: 1;
          pointer-events: auto;
          top: 0;
          display: ${expanded ? 'block' : 'none'};
        }
      }
    `;
  }};

  &:hover {
    @media(min-width: ${MOBILE_VIEW + 1}px) {
      & .nav-menu {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }

  & .appbar-item {
    min-height: ${NAVBAR_HEIGHT}px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    font-size: 16px;
    position: relative;
    cursor: pointer;
    transition: 0.1s background-color;
    ${noUserSelect()};

    ${({ selected, menuVisible }: NavItemProps) => css`
      padding-right: ${menuVisible ? 0 : 16}px;
      font-weight: ${selected ? 500 : 400};

      ${selected && css`
        &::after {
          content: "";
          display: block;
          width: 100%;
          height: 2px;
          left: 0;
          bottom: -1px;
          background: ${GRADIENT};
          position: absolute;
        }
      `}

      ${menuVisible && css`
        @media(max-width: ${MOBILE_VIEW}px) {
          display: block;
          padding-top: 16px;

          &:hover {
            background-color: transparent !important;

            & .appbar-expand-icon {
              background-color: rgba(0, 0, 0, 0.08);
            }
          }
        }
      `}
    `};

    &:hover {
      background-color: #f5f5f5;
    }

    @media(max-width: ${MOBILE_VIEW}px) {
      &::after {
        width: 2px;
        height: 100%;
        bottom: 0;
        background: ${GRADIENT_VERTICAL};
      }
    }
  }
`;

export const ExpandIcon = styled.div`
  width: 20px;
  height: 20px;
  opacity: ${transparency.icons.disabled};
  background-image: url(${icons.chevron});
  margin-left: 4px;
  margin-right: 8px;
  transform: rotate(90deg);
  border-radius: 100%;
  ${centerIcon(20)};

  ${({ expanded }: { expanded: boolean }) => css`
    @media(max-width: ${MOBILE_VIEW}px) {
      transform: rotate(${expanded ? -90 : 90}deg);
    }
  `}

  @media(max-width: ${MOBILE_VIEW}px) {
    width: 48px;
    height: 48px;
    position: absolute;
    top: 2px;
    right: 12px;
  }
`;

export const MenuButton = styled.div`
  width: 48px;
  height: 48px;
  background-image: url(${icons.menu});
  margin: 16px auto;
  border-radius: 100%;
  transition: 0.1s background-color;
  cursor: pointer;
  display: none;
  ${centerIcon(24)};

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  @media(max-width: ${MOBILE_VIEW}px) {
    display: block;
  }
`;
