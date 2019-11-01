import { css } from 'styled-components';

export const aspectRatio = (ratio: number) => css`
  position: relative;

  &::before {
    content: "";
    display: block;
    padding-bottom: calc(100% / ${ratio});
  }

  & > img {
    height: auto;
  }

  & > :first-child {
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }
`;
