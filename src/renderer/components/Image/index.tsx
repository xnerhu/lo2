import * as React from 'react';

import { preFetchImage } from '~/renderer/app/utils';
import { Skeleton } from '../Skeleton';
import { Container, StyledImage } from './style';

interface Props {
  src: string;
  ratio?: number;
  style?: React.CSSProperties;
  skeletonBorder?: number;
  forceSkeleton?: boolean;
}

export const Image = ({ src, style, ratio, skeletonBorder, forceSkeleton }: Props) => {
  const [fetched, setFetched] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setFetched(false);

      await preFetchImage(src);
      setFetched(true);
    })();
  }, [src]);

  const isFetched = !forceSkeleton && fetched;

  const imgStyle = {
    backgroundImage: `url(${src})`,
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
    <Container ratio={ratio} style={style}>
      <StyledImage style={imgStyle} />
      {!isFetched && <Skeleton style={skeletonStyle} />}
    </Container>
  );
}

Image.defaultProps = {
  skeletonBorder: true,
}
