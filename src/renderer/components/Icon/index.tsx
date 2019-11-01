import * as React from 'react';

import { StyledIcon } from './style';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  fill?: string;
  center?: boolean;
  size?: number;
}

export const Icon = ({ src, size, fill, center, style, ...props }: Props) => {
  const iconSize = center ? '100%' : size;

  const iconStyle = {
    backgroundColor: fill,
    ...style,
    width: iconSize,
    height: iconSize,
    [fill ? 'WebkitMaskImage' : 'backgroundImage']: `url(${src})`,
  }

  return (
    <StyledIcon {...props} style={iconStyle} useMask={fill != null} size={center && size} />
  )
}
