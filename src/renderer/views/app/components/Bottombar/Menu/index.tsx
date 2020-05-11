import React from 'react';

import { desktopNavMap } from '../../../constants/navigation';
import { StyledMenu, Item, Close } from './style';

interface Props {
  onClose?: () => void;
}

export const Menu = ({ onClose }: Props) => {
  return (
    <StyledMenu>
      {desktopNavMap.map((r) => (
        <Item key={r.path} to={r.path}>
          {r.label}
        </Item>
      ))}
      <Close onClick={onClose} />
    </StyledMenu>
  );
};

export default Menu;
