import * as React from 'react';

import { Image } from '../Image';

export const CardImage = ({ src }: { src: string }) => {
  return <Image src={src} ratio={16 / 9} skeletonBorder={0} />;
}
