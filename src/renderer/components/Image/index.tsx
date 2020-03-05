import React from 'react';

import { preFetchImage } from '~/renderer/app/utils/network';
import {
  Container,
  Picture,
  StyledImage,
  Label,
  StyledSkeleton,
} from './style';

export interface IImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  ratio?: number;
  skeletonBorder?: number | string;
  forceSkeleton?: boolean;
  children?: React.ReactNode;
  className?: string;
  jpgOnly?: boolean;
  shadow?: boolean;
  style?: React.CSSProperties;
  cache?: boolean;
}

export const Image = ({
  src,
  alt,
  ratio,
  skeletonBorder,
  forceSkeleton,
  children,
  style,
  className,
  cache,
  shadow,
  jpgOnly,
}: IImageProps) => {
  const [fetched, setFetched] = React.useState(forceSkeleton);
  const ext = jpgOnly ? 'jpg' : 'webp';

  if (!forceSkeleton) {
    React.useEffect(() => {
      let canceled = false;
      let error = false;

      (async () => {
        setFetched(false);

        try {
          await preFetchImage(src, ext, cache);
        } catch (err) {
          console.warn(src, err);
          error = true;
        }

        if (!canceled && !error) {
          setFetched(true);
        }
      })();

      return () => {
        canceled = true;
      };
    }, [src]);
  }

  const isFetched = !forceSkeleton && fetched;

  const _className = `dynamic-image ${className || ''} ${
    isFetched ? 'fetched' : ''
  }`;

  return (
    <Container
      className={_className}
      ratio={ratio}
      style={style}
      shadow={shadow}
    >
      {src ? (
        <Picture fetched={isFetched}>
          {!jpgOnly && <source srcSet={`${src}.${ext}`} type="image/webp" />}
          <StyledImage src={src + '.jpg'} alt={alt} />
        </Picture>
      ) : null}
      {!isFetched && <StyledSkeleton borderRadius={skeletonBorder} />}
      {children && <Label>{children}</Label>}
    </Container>
  );
};
