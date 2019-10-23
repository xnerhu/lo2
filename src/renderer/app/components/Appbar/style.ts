import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { h3, h4, noUserSelect, centerIcon, h5 } from '~/renderer/mixins';
import { transparency, GRADIENT, GRADIENT_VERTICAL, icons, MOBILE_VIEW } from '~/renderer/constants';

export const Title = styled.div`
  padding-top: 32px;
  padding-bottom: 24px;
  text-align: center;
  font-weight: 300 !important;
  ${h3()};

  @media(max-width: ${MOBILE_VIEW}px) {
    border-bottom: 1px solid rgba(0, 0, 0, ${transparency.dividers});
    padding-left: 24px;
    padding-right: 24px;
    ${h4()};
  }

  @media(max-width: 576px) {
    font-size: 30px;
  }
`;

export const Navbar = styled.nav`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, ${transparency.dividers});
  background-color: #fff;

  ${({ visible }: { visible: boolean }) => css`
    @media(max-width: ${MOBILE_VIEW}px) {
      display: ${visible ? 'block' : 'none'};
    }
  `}

  @media(max-width: ${MOBILE_VIEW}px) {
    width: 100%;
    height: 100%;
    flex-direction: column;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    overflow-y: auto;

    &::before {
      content: 'PLO2 Opole';
      display: block;
      padding: 0px 24px;
      height: 80px;
      display: flex;
      align-items: center;
      ${h4()};
      font-weight: 300;
    }
  }
`;

export const StyledNavItem = styled(Link)`
  height: 100%;
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

      @media(max-width: ${MOBILE_VIEW}px) {
        height: 48px;

        &::after {
          width: 4px;
          height: 100%;
          bottom: 0;
          background: ${GRADIENT_VERTICAL};
        }
      }
    `}
  `}

  &:hover {
    background-color: #f5f5f5;
  }

  @media(max-width: ${MOBILE_VIEW}px) {
    height: 48px;
    padding: 0px 24px;
  }
`

export const MenuButton = styled.div`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 16px;
  right: 8px;
  background-image: url(${icons.menu});
  border-radius: 100%;
  cursor: pointer;
  transition: 0.1s background-color;
  display: none;
  z-index: 20;
  ${noUserSelect()};
  ${centerIcon(24)};

  @media(max-width: ${MOBILE_VIEW}px) {
    display: block;
  }

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    background-color: #eee;
  }
`;
