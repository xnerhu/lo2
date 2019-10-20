import styled, { css } from 'styled-components';

import { aspectRatio, shadows, coverImage } from '~/renderer/mixins';

export const StyledSlider = styled.div`
  margin-top: 32px;
  border-radius: 16px;
  overflow: hidden;
  ${aspectRatio(16 / 5)};
`;

export const Image = styled.div`
  width: 100%;
  background-position: center;
  transition: 0.15s background-image;
  ${coverImage()};
  
  ${({ src, fetched }: { src: string, fetched: boolean }) => css`
    background-image: url(${src});
    opacity: ${fetched ? 1 : 0};
  `};
`;

export const Controls = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 16px;
`;

export const Control = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-radius: 100%;
  cursor: pointer;
  box-shadow: ${shadows(4)};
  transition: 0.1s background-color;

  ${({ selected }: { selected: boolean }) => css`
    background-color: ${selected ? '#fff' : 'unset'};
  `}

  &:not(:first-child) {
    margin-left: 8px;
  }

  &:hover {
    background-color: #fff;
  }
`;
