import styled, { css } from 'styled-components';

import { PRIMARY_COLOR } from '~/renderer/constants';
import { centerIcon } from '~/renderer/mixins';

export const Container = styled.div`
  width: fit-content;
  display: grid;
  grid-gap: 48px;
  margin: 64px auto 0px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 967px) {
    grid-template-columns: repeat(2, 1fr);
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

  &:hover > :first-child {
    background-color: rgba(0, 174, 239, 0.04);
    transform: scale(1.1);
  }
`;

export const Circle = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 100%;
  background-color: #fff;
  border: 1px solid ${PRIMARY_COLOR};
  transition: 0.1s transform, 0.1s background-color;

  @media (max-width: 967px) {
    width: 96px;
    height: 96px;
  }
`;

export const Icon = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${PRIMARY_COLOR};
  ${centerIcon(56, true)};

  ${({ src }: { src: string }) => css`
    mask-image: url(${src});
  `}

  @media (max-width: 967px) {
    ${centerIcon(48, true)};
  }
`;

export const Title = styled.div`
  margin-top: 16px;
  font-size: 16px;

  @media (max-width: 967px) {
    font-size: 16px;
  }
`;
