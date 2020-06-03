import React from 'react';

import { desktopNavMap } from '../../constants/navigation';
import { StyledMenu, Item, Close } from './style';

interface Props {
  onClose?: () => void;
}

export default ({ onClose }: Props) => {
  return (
    <StyledMenu>
      {desktopNavMap.map((r) => (
        <Item key={r.path} to={r.path} onClick={onClose}>
          {r.label}
        </Item>
      ))}
      <Close onClick={onClose} />
    </StyledMenu>
  );
};
