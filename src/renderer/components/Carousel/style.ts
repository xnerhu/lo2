import styled, { css } from 'styled-components';

import { Image as DynamicImage } from '~/renderer/components/Image';
import { aspectRatio, centerVertical } from '~/renderer/mixins';
import {
  WIDE_RATIO,
  STANDARD_RATIO,
  icons,
  transparency,
} from '~/renderer/constants';

export const StyledCarousel = styled.div`
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  ${aspectRatio(WIDE_RATIO)};

  &:hover > .arrow {
    opacity: 1;
  }

  @media (max-width: 967px) {
    ${aspectRatio(STANDARD_RATIO)};
  }
`;

export const Image = styled(DynamicImage)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
`;

export const Controls = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const Control = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  cursor: pointer;
  background-color: #000;
  transition: 0.1s opacity;

  ${({ selected }: { selected: boolean }) => css`
    opacity: ${selected ? 0.87 : 0.16};
  `}

  &:not(:first-child) {
    margin-left: 8px;
  }

  &:hover {
    opacity: 0.87;
  }
`;

export const Arrow = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  background-color: rgba(255, 255, 255, 0.48);
  ${centerVertical()};
  transition: 0.1s opacity, 0.1s background-color;

  ${({ right }: { right?: boolean }) => css`
    left: ${right ? 'unset' : '16px'};
    right: ${right ? '16px' : 'unset'};

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
    position: relative;
  }
`;
