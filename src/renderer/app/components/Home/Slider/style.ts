import styled, { css } from 'styled-components';

import { aspectRatio, shadows } from '~/renderer/mixins';
import { WIDE_RATIO, STANDARD_RATIO, icons, transparency } from '~/renderer/constants';

export const StyledSlider = styled.div`
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  ${aspectRatio(WIDE_RATIO)};

  &:hover > .arrow {
    opacity: 1;
  }

  @media(max-width: 967px) {
    ${aspectRatio(STANDARD_RATIO)};
  }
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

export const Arrow = styled.div`
  width: 64px;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.16);
  opacity: 0;
  transition: 0.1s opacity, 0.1s background-color;
  cursor: pointer;

  ${({ right }: { right?: boolean }) => css`
    left: ${right ? 'unset' : 0};
    right: ${right ? 0 : 'unset'};

    &::before {
      transform: ${right ? 'unset' : 'rotate(180deg)'};
    }
  `}

  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background-image: url(${icons.chevron});
    opacity: ${transparency.icons.inactive};
    filter: invert(100%);
    transition: 0.1s opacity;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.24);

    &::before {
      opacity: 1;
    }
  }
`;
