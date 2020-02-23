import React from 'react';

import { Path, StyledPreloader } from './style';

export interface Props {
  style?: any;
  color?: string;
  thickness?: number;
  size?: number;
}

export const Preloader = ({ style, color, size, thickness }: Props) => {
  return (
    <div className="preloader" style={style}>
      <StyledPreloader size={size}>
        <svg viewBox="25 25 50 50">
          <Path
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeMiterlimit="10"
            color={color}
            thickness={thickness}
          />
        </svg>
      </StyledPreloader>
    </div>
  );
};

Preloader.defaultProps = {
  thickness: 4,
  size: 48,
  color: '#3F51B5',
};
