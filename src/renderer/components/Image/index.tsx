import * as React from 'react';

import { preFetchImage } from '~/renderer/app/utils';
import { Skeleton } from '../Skeleton';
import { Container, StyledImage, Label, Picture } from './style';

interface Props {
  src: string;
  ratio?: number;
  skeletonBorder?: number;
  forceSkeleton?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Image = ({ src, style, ratio, skeletonBorder, forceSkeleton, children }: Props) => {
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

  const imgStyle = {
    opacity: isFetched ? 1 : 0,
  }

  const skeletonStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    borderRadius: skeletonBorder == null ? 12 : skeletonBorder,
  }

  return (
    <Container className='dynamic-image' ratio={ratio} style={style}>
      <Picture>
        <source srcSet={src + '.webp'} type='image/webp' />
        <StyledImage src={src + '.jpg'} style={imgStyle} />
      </Picture>
      {!isFetched && <Skeleton style={skeletonStyle} />}
      {children && <Label>{children}</Label>}
    </Container>
  );
}

