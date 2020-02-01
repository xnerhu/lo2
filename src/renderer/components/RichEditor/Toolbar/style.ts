import styled, { css } from 'styled-components';

import { transparency, PRIMARY_COLOR } from '~/renderer/constants';
import { centerIcon, centerBoth } from '~/renderer/mixins';

export const StyledToolbar = styled.div`
  width: 100%;
  height: 64px;
  background-color: #fff;
  border-radius: 8px;
  padding: 0px 16px;
  display: flex;
  align-items: center;
`;

export const StyledButton = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  position: relative;
  cursor: pointer;
  will-change: background-color;
  transition: 0.1s background-color;

  ${({ active, icon }: { active: boolean; icon: string }) => css`
    &::before {
      background-color: ${active ? PRIMARY_COLOR : '#000'};
      mask-image: url(${icon});
      opacity: ${active ? 1 : transparency.icons.inactive};
    }

    ${active &&
      css`
        background-color: rgba(0, 174, 239, 0.12);
      `}
  `}

  &:not(:first-child) {
    margin-left: 8px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    will-change: background-color, opacity;
    transition: 0.1s background-color, 0.1s opacity;
    ${centerIcon(18, true)};
    ${centerBoth()};
  }
`;

export const Divider = styled.div`
  height: 32px;
  width: 1px;
  margin-left: 8px;
  background-color: rgba(0, 0, 0, ${transparency.dividers});
`;
