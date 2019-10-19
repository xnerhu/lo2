import styled, { css } from 'styled-components';

import { shadows } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';

export const StyledContextMenu = styled.div`
  width: 244px;
  position: fixed;
  z-index: 1000;
  padding: 8px 0px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: ${shadows(6)};

  ${({ visible }: { visible: boolean }) => css`
    pointer-events: ${visible ? 'auto' : 'none'};
    opacity: ${visible ? 1 : 0};
    transition: ${visible ? '0.15s opacity' : 'unset'};
  `}
`;

export interface IContextMenuItemProps {
  disabled?: boolean;
  hidden?: boolean;
  value?: any;
}

export const StyledItem = styled.div`
  width: 100%;
  height: 32px;
  padding: 0px 16px;
  align-items: center;
  font-size: 14px;
  white-space: nowrap;

  ${({ disabled, hidden }: IContextMenuItemProps) => css`
    display: ${!hidden ? 'flex' : 'none'};
    color: ${disabled
      ? `rgba(0, 0, 0, ${transparency.text.disabled})`
      : '#000'};

    &:hover {
      background-color: ${!disabled ? 'rgba(0, 0, 0, 0.04)' : 'transparent'};
    }
  `}
`;

export const MenuDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, ${transparency.dividers});
  margin: 8px 0px;
`;
