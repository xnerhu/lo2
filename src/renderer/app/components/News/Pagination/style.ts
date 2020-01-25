import styled, { css } from 'styled-components';

import { PRIMARY_COLOR, icons, transparency } from '~/renderer/constants';
import { robotoMedium, centerIcon, noUserSelect } from '~/renderer/mixins';

export const StyledPagination = styled.div`
  width: 100%;
  max-width: 512px;
  margin-top: 48px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.div`
  width: 144px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${PRIMARY_COLOR};
  color: ${PRIMARY_COLOR};
  border-radius: 64px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s background-color, 0.2s color;
  ${robotoMedium()};
  ${noUserSelect()}

  ${({ disabled }: { disabled: boolean }) => css`
    pointer-events: ${disabled ? 'none' : 'all'};
    opacity: ${disabled ? transparency.text.disabled : 1};
  `}

  &::after {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background-color: ${PRIMARY_COLOR};
    mask-image: url(${icons.chevron});
    transition: 0.2s background-color;
    ${centerIcon(24, true)};
  }

  &:first-child {
    margin-right: 6px;
    flex-direction: row-reverse;

    &::after {
      transform: rotate(-180deg);
    }
  }

  &:hover {
    background-color: ${PRIMARY_COLOR};
    color: #fff;

    &::after {
      background-color: #fff;
    }
  }
`;
