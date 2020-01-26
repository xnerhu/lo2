import * as React from 'react';

import { StyledError, Description, Circle } from './style';

interface Props {
  code: string;
  label: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Error = ({ code, label, style, children }: Props) => {
  return (
    <StyledError style={style}>
      <Circle>{code}</Circle>
      <b>
        <h4 style={{ fontWeight: 500 }}>{label}</h4>
      </b>
      {children && <Description>{children}</Description>}
    </StyledError>
  );
};
