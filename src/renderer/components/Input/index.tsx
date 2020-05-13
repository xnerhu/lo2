import React from 'react';

import { ErrorLabel } from '../Error';
import { StyledInput } from './style';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef(
  ({ error, ...props }: Props, ref: React.RefCallback<HTMLInputElement>) => {
    return (
      <>
        <StyledInput ref={ref} error={!!error} {...props} />
        <ErrorLabel error={error} />
      </>
    );
  },
);
