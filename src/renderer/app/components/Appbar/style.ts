import styled, { css } from 'styled-components';

import {
  icons,
  APPBAR_MOBILE_VIEW,
  CARD_SHADOW,
  EASING_FUNCTION,
  APPBAR_DESKTOP_HEIGHT,
  APPBAR_MOBILE_HEIGHT,
} from '~/renderer/constants';
import { Content } from '~/renderer/components/Section';
import { centerIcon, noUserSelect, centerVertical } from '~/renderer/mixins';

export const StyledAppbar = styled.div`
  width: 100%;
  height: ${APPBAR_DESKTOP_HEIGHT}px;
  z-index: 10;
  background-color: #fff;
  position: relative;
  ${noUserSelect()};

  ${({ visible, hideShadow }: { visible: boolean; hideShadow: boolean }) => css`
    margin-top: ${visible ? 0 : -72}px;
    transition: 0.3s ${EASING_FUNCTION} margin-top;

    ${!hideShadow &&
      css`
        @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
          box-shadow: ${CARD_SHADOW};
        }
      `}
  `}

  @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
    height: ${APPBAR_MOBILE_HEIGHT}px;
    position: fixed;
    top: 0;
    left: 0;
  }
`;

export const Container = styled(Content)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

export const Banner = styled.img`
  height: 56px;
  position: absolute;
  left: 0;
  z-index: 10;

  @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
    height: 40px;
  }
`;

export const NavItems = styled.nav`
  margin-left: auto;
  display: flex;
  transition: 0.1s opacity;

  ${({ expanded }: { expanded: boolean }) => css`
    ${expanded &&
      css`
        opacity: 1 !important;
        pointer-events: auto !important;
      `}
  `}

  @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
    width: 100%;
    height: 100%;
    top: 0px;
    padding-top: ${APPBAR_MOBILE_HEIGHT}px;
    flex-direction: column;
    left: 0;
    position: fixed;
    overflow-y: auto;
    z-index: 10;
    opacity: 0;
    background-color: #fff;
    pointer-events: none;
  }
`;

export const MenuIcon = styled.div`
  width: 48px;
  height: 48px;
  position: absolute;
  right: 24px;
  border-radius: 100%;
  cursor: pointer;
  display: none;
  z-index: 10;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  ${centerIcon(24)}
  ${centerVertical()};

  ${({ expanded }: { expanded: boolean }) => css`
    background-image: url(${expanded ? icons.close : icons.menu});
  `}

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
    display: block;
  }
`;

export const Placeholder = styled.div`
  width: 100%;
  height: ${APPBAR_MOBILE_HEIGHT}px;
  margin-bottom: 16px;
  display: none;

  @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
    display: block;
  }
`;
