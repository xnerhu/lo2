import React from 'react';

import { StyledError, Description, Circle, StyledErrorLabel } from './style';

interface ErrorProps {
  code: string;
  label: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Error = ({ code, label, style, children }: ErrorProps) => {
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

interface ErrorLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  error: string;
}

export const ErrorLabel = ({ error, ...props }: ErrorLabelProps) => {
  if (!error) return null;

  return <StyledErrorLabel {...props}>{error}</StyledErrorLabel>;
};
