import styled, { css } from 'styled-components';

import { PRIMARY_COLOR, transparency } from '~/renderer/constants';
import { noUserSelect, robotoMedium, centerIcon } from '~/renderer/mixins';
import { Link } from '../Link';

export const buttonBase = css`
  width: fit-content;
  min-width: 144px;
  padding: 0px 16px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  will-change: background-color, color;
  transition: 0.15s background-color, 0.15s color;
  ${robotoMedium()};
  ${noUserSelect()};
`;

export const Button = styled(Link)`
  color: ${PRIMARY_COLOR};
  border: 2px solid ${PRIMARY_COLOR};
  border-radius: 64px;
  ${buttonBase};

  ${({
    disabled,
    icon,
    reversedIcon,
  }: {
    disabled?: boolean;
    icon?: string;
    reversedIcon?: boolean;
  }) => css`
    pointer-events: ${disabled ? 'none' : 'all'};
    opacity: ${disabled ? transparency.text.disabled : 1};

    ${icon &&
      css`
        &::after {
          content: '';
          display: block;
          width: 24px;
          height: 24px;
          background-color: ${PRIMARY_COLOR};
          mask-image: url(${icon});
          transition: 0.2s background-color;
          ${centerIcon(24, true)};
        }

        &:hover::after {
          background-color: #fff;
        }

        ${reversedIcon &&
          css`
            flex-direction: row-reverse;

            &::after {
              transform: rotate(-180deg);
            }
          `}
      `}

    ${!disabled &&
      css`
        &:hover {
          background-color: ${PRIMARY_COLOR};
          color: #fff;
        }
      `}
  `}
`;
