import React from 'react';

import { desktopNavMap } from '../../constants/navigation';
import { IDesktopNavItem } from '../../interfaces';
import { StyledMenu, Item, Close } from './style';

interface Props {
  visible?: boolean;
  onClose?: () => void;
}

export const Menu = ({ visible, onClose }: Props) => {
  return (
    <StyledMenu visible={visible}>
      {desktopNavMap.map((r) => (
        <Item key={r.path} to={r.path}>
          {r.label}
        </Item>
      ))}
      <Close onClick={onClose} />
    </StyledMenu>
  );
};
