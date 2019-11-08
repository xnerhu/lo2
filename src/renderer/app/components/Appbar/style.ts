import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { h3, h4, noUserSelect, centerIcon, robotoLight } from '~/renderer/mixins';
import { transparency, GRADIENT, GRADIENT_VERTICAL, icons, MOBILE_VIEW, BACKGROUND_COLOR, NAVBAR_HEIGHT } from '~/renderer/constants';
import { Icon } from '~/renderer/components/Icon';

export const Header = styled.header`
  padding: 32px 0px 24px;
  text-align: center;
  ${h3()};
  ${robotoLight()};
`;

export const Navbar = styled.nav`
  width: 100%;
  height: ${NAVBAR_HEIGHT}px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, ${transparency.dividers});
  background-color: ${BACKGROUND_COLOR};
  margin-bottom: 32px;

  /* @media(max-width: ${MOBILE_VIEW}px) {
    height: 100%;
    flex-direction: column;
    justify-content: start;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    overflow-y: auto;

    &::before {
      content: 'LO2 Opole';
      display: block;
      padding: 0px 24px;
      height: 80px;
      display: flex;
      align-items: center;
      ${h4()};
      font-weight: 300;
    }
  } */
`;

export const StyledNavItem = styled(Link)`
  min-height: ${NAVBAR_HEIGHT - 1}px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  font-size: 16px;
  position: relative;
  cursor: pointer;
  ${noUserSelect()};

  ${({ selected }: { selected: boolean }) => css`
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
  `}

  &:hover {
    background-color: #f5f5f5;

    & .nav-menu {
      display: block;
    }
  }

  /* @media(max-width: ${MOBILE_VIEW}px) {
    &::after {
      width: 4px;
      height: 100%;
      bottom: 0;
      background: ${GRADIENT_VERTICAL};
    }
  } */
`

export const ExpandIcon = styled(Icon)`
  opacity: ${transparency.icons.inactive};
  margin-left: auto;
  margin-right: 4px;
  transition: 0.15s transform;
  display: none;
  
  ${({ expanded }: { expanded: boolean }) => css`
    transform: rotate(${expanded ? 90 : -90}deg);
  `}

  /* @media(max-width: ${MOBILE_VIEW}px) {
    display: block;
  } */
`;

export const MenuButton = styled.div`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 16px;
  right: 8px;
  border-radius: 100%;
  cursor: pointer;
  transition: 0.1s background-color;
  display: none;
  z-index: 10;
  background-image: url(${icons.menu});
  ${noUserSelect()};
  ${centerIcon(24)};

  /* @media(max-width: ${MOBILE_VIEW}px) {
    display: block;
  } */

  &:hover {
    background-color: #f5f5f5;
  }
`;

