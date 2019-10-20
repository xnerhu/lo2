import * as React from 'react';

import { preFetchImage } from '~/renderer/app/utils';
import { Skeleton } from '../Skeleton';
import { Container, StyledImage } from './style';

interface Props {
  src: string;
  ratio?: number;
  style?: React.CSSProperties;
  skeletonBorder?: number;
}

export const Image = ({ src, style, ratio, skeletonBorder }: Props) => {
  const [fetched, setFetched] = React.useState(false);

  React.useEffect(() => {
    setFetched(false);
    preFetchImage(src).then(() => {
      setFetched(true);
    });
  }, [src]);

  const skeletonStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    borderRadius: skeletonBorder == null ? 12 : skeletonBorder,
  }

  return (
    <Container ratio={ratio} style={style}>
      <StyledImage src={src} fetched={fetched} />
      {!fetched && <Skeleton style={skeletonStyle} />}
    </Container>
  );
}

Image.defaultProps = {
  skeletonBorder: true,
}
