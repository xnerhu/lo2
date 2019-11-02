import * as React from 'react';

import { StyledMenu } from './style';

export const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledMenu className='nav-menu'>
      {children}
    </StyledMenu>
  )
}
