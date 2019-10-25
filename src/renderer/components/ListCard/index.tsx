import * as React from 'react';

import { StyledCard } from '../Card/style';
import { Icon, Title } from './style';
import { Link } from 'react-router-dom';

interface Props {
  icon?: string;
  to?: string;
  children?: any;
  style?: React.CSSProperties;
}

export const ListCard = ({ icon, to, children, style }: Props) => {
  return (
    <Link to={to}>
      <StyledCard className='list-card' style={{ flexDirection: 'row', alignItems: 'center', height: 64, ...style }}>
        <Icon style={{ backgroundImage: `url(${icon})` }} />
        <Title>{children}</Title>
      </StyledCard>
    </Link>
  )
}
