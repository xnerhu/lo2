import styled, { css } from 'styled-components';

import { Link } from '../Link';
import { robotoMedium } from '~/renderer/mixins/typography';
import { noUserSelect } from '~/renderer/mixins/user-selection';
import { PRIMARY_COLOR, ERROR_COLOR } from '~/renderer/constants/design';
import { transparency } from '~/renderer/constants/transparency';
import { centerIcon } from '~/renderer/mixins/images';

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

export const RaisedButton = styled.div`
  background-color: rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  ${buttonBase};

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.12);
  }
`;

export const FlatButton = styled.div`
  background-color: #fff;
  border-radius: 8px;
  color: ${PRIMARY_COLOR};
  ${buttonBase};

  &:hover,
  &:focus {
    background-color: rgba(0, 174, 239, 0.12);
  }
`;

export const DeleteButton = styled(FlatButton)`
  color: ${ERROR_COLOR};

  &:hover,
  &:focus {
    background-color: rgba(176, 0, 32, 0.12);
  }
`;
