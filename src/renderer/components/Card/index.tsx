import * as React from 'react';

import { Image, IImageProps } from '../Image';

export const CardImage = (props: IImageProps) => {
  return <Image {...props} ratio={16 / 9} skeletonBorder={0} />;
}
