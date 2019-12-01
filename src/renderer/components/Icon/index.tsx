import * as React from 'react';

import { StyledIcon } from './style';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  fill?: string;
  className?: string;
  center?: boolean;
  size?: number;
}

export const Icon = ({ src, size, fill, center, style, className }: Props) => {
  const iconSize = center ? '100%' : size;

  const iconStyle = {
    backgroundColor: fill,
    ...style,
    width: iconSize,
    height: iconSize,
    [fill ? 'WebkitMaskImage' : 'backgroundImage']: `url(${src})`,
  }

  return (
    <StyledIcon className={className} style={iconStyle} useMask={fill != null} size={center && size} />
  )
}
