import styled, { css } from 'styled-components';

import { aspectRatio, noUserSelect } from '~/renderer/mixins';
import { Skeleton } from '../Skeleton';

export const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  ${noUserSelect()};

  ${({ ratio }: { ratio: number }) => css`
    ${ratio && aspectRatio(ratio)};
  `}   
`;

export const Picture = styled.picture`
  width: 100%;
  height: 100%;
  transition: 0.15s opacity;

  ${({ fetched }: { fetched: boolean }) => css`
    opacity: ${fetched ? 1 : 0};
  `}
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
`;

export const Label = styled.div`
  margin-top: 8px;
`;

export const StyledSkeleton = styled(Skeleton)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;

  ${({ borderRadius }: { borderRadius: number }) => css`
    border-radius: ${borderRadius == null ? 12 : borderRadius}px;
  `}
`;
