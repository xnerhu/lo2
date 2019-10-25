import * as React from 'react';

import { StyledCard } from '../Card/style';
import { Icon, Title } from './style';

interface Props {
  icon?: string;
  link?: string;
  children?: any;
}

export const ListCard = ({ icon, link, children }: Props) => {
  return (
    <StyledCard className='list-card' style={{ flexDirection: 'row', alignItems: 'center', height: 64 }}>
      <Icon style={{ backgroundImage: `url(${icon})` }} />
      <Title>{children}</Title>
    </StyledCard>
  )
}
