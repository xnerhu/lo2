import styled, { css } from 'styled-components';

import { h3, robotoLight } from '~/renderer/mixins';
import { transparency, GRADIENT } from '~/renderer/constants';

export const Title = styled.div`
  padding-top: 32px;
  padding-bottom: 24px;
  text-align: center;
  ${h3()};
  ${robotoLight()};
`;

export const Navbar = styled.nav`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, ${transparency.dividers});
`;

export const StyledNavItem = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  font-size: 16px;
  position: relative;
  cursor: pointer;

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
  }
`
