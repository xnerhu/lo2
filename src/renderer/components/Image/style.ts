import styled, { css } from 'styled-components';

import { coverImage, aspectRatio } from '~/renderer/mixins';

export const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;

  ${({ ratio }: { ratio: number }) => css`
    ${ratio ? aspectRatio(ratio) : ''};
  `}
`;

export const StyledImage = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  transition: 0.15s background-image;
  ${coverImage()};
  
  ${({ src, fetched }: { src: string, fetched: boolean }) => css`
    background-image: url(${src});
    opacity: ${fetched ? 1 : 0};
  `};
`;
