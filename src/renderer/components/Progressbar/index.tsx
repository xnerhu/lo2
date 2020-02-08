import React from 'react';

import { StyledProgressbar, Background, Bar } from './style';

interface Props {
  value: number;
}

export const Progressbar = ({ value }: Props) => {
  return (
    <StyledProgressbar>
      <Background />
      <Bar style={{ width: `${value}%` }} />
    </StyledProgressbar>
  );
};
