import styled, { css } from 'styled-components';

import { icons, transparency, CARD_SHADOW, SHORTCUT_CARD_SIZE, MOBILE_VIEW, PRIMARY_COLOR } from '~/renderer/constants';
import { centerIcon } from '~/renderer/mixins';

const GAP_SIZE = 64;
const CHEVRON_SIZE = 32;
const CHEVRON_MARGIN = -CHEVRON_SIZE - (GAP_SIZE - CHEVRON_SIZE) / 2;

export const Container = styled.div`
  width: fit-content;
  display: grid;
  grid-gap: ${GAP_SIZE}px;
  margin: 64px auto 0px;
  grid-template-columns: repeat(4, 1fr);

  @media(max-width: 967px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 48px;
  }

  @media(max-width: 576px) {
    grid-gap: 32px;
  }
`;

export const StyledItem = styled.a`
  width: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  cursor: pointer;

  &:hover .shortcuts-circle {
    transform: scale(1.1);
  }

  &:not(:last-child)::after {
    content: '';
    display: block;
    width: ${CHEVRON_SIZE}px;
    height: ${CHEVRON_SIZE}px;
    position: absolute;
    right: ${CHEVRON_MARGIN}px;
    top: ${SHORTCUT_CARD_SIZE / 2}px;
    transform: translateY(-50%);
    background-image: url(${icons.chevron});
    opacity: ${transparency.icons.disabled};
    ${centerIcon('contain')};
  }

  @media(max-width: 1080px) {
    &::after {
      display: none !important;
    }
  }
`;

export const Circle = styled.div`
  width: ${SHORTCUT_CARD_SIZE}px;
  height: ${SHORTCUT_CARD_SIZE}px;
  border-radius: 100%;
  background-color: #fff;
  box-shadow: ${CARD_SHADOW};
  transition: 0.1s transform;

  @media(max-width: 967px) {
    width: 128px;
    height: 128px;
  }

  @media(max-width: 372px) {
    width: 96px;
    height: 96px;
  }
`;

export const Icon = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${PRIMARY_COLOR};
  ${centerIcon(64, true)};

  ${({ src }: { src: string }) => css`
    mask-image: url(${src});
  `}

  @media(max-width: 967px) {
    ${centerIcon(48, true)};
  }
`;

export const Title = styled.h6`
  margin-top: 20px;
  font-weight: 400;

  @media(max-width: 967px) {
    font-size: 16px;
  }
`;
