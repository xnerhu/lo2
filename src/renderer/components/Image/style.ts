import styled, { css } from 'styled-components';

import { aspectRatio, noUserSelect } from '~/renderer/mixins';

export const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  ${noUserSelect()};

  ${({ ratio }: { ratio: number }) => css`
    ${ratio && aspectRatio(ratio)};
  `}   
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
  transition: 0.15s opacity;
`;

export const Label = styled.div`
  margin-top: 8px;
`;

export const Picture = styled.picture`
  width: 100%;
  height: 100%;
`;
