import * as React from 'react';

import { preFetchImage } from '~/renderer/app/utils';
import { Container, Picture, StyledImage, Label, StyledSkeleton } from './style';

export interface IImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  ratio?: number;
  skeletonBorder?: number | string;
  forceSkeleton?: boolean;
  children?: React.ReactNode;
}

export const Image = ({ src, alt, ratio, skeletonBorder, forceSkeleton, children, ...props }: IImageProps) => {
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
  const className = `dynamic-image ${props.className || ''}`;

  return (
    <Container className={className} ratio={ratio} {...props}>
      <Picture fetched={isFetched}>
        <source srcSet={src + '.webp'} type='image/webp' />
        <StyledImage src={src + '.jpg'} alt={alt} />
      </Picture>
      {!isFetched && <StyledSkeleton borderRadius={skeletonBorder} />}
      {children && <Label>{children}</Label>}
    </Container>
  );
}

