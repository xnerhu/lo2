import * as React from 'react';

import { preFetchImage } from '~/renderer/app/utils';
import { Container, Picture, StyledImage, Label, StyledSkeleton } from './style';

export interface IImageProps {
  src: string;
  alt?: string;
  ratio?: number;
  skeletonBorder?: number;
  forceSkeleton?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Image = ({ src, alt, style, ratio, skeletonBorder, forceSkeleton, children }: IImageProps) => {
  const [fetched, setFetched] = React.useState(forceSkeleton);

  React.useEffect(() => {
    if (forceSkeleton) return;

    (async () => {
      setFetched(false);

      try {
        await preFetchImage(src);
      } catch (err) {
        console.warn(err);
      }

      setFetched(true);
    })();
  }, [src]);

  const isFetched = !forceSkeleton && fetched;

  return (
    <Container className='dynamic-image' ratio={ratio} style={style}>
      <Picture fetched={isFetched}>
        <source srcSet={src + '.webp'} type='image/webp' />
        <StyledImage alt={alt} src={src + '.jpg'} />
      </Picture>
      {!isFetched && <StyledSkeleton borderRadius={skeletonBorder} />}
      {children && <Label>{children}</Label>}
    </Container>
  );
}

