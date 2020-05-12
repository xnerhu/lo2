import styled, { css } from 'styled-components';

import { Link } from '../Link';
import { robotoMedium } from '~/renderer/mixins/typography';
import { noUserSelect } from '~/renderer/mixins/user-selection';
import { PRIMARY_COLOR, ERROR_COLOR } from '~/renderer/constants/design';
import { centerIcon } from '~/renderer/mixins/images';

interface Props {
  icon?: string;
  iconOnRight?: boolean;
  iconRotation?: number;
  reversed?: boolean;
  disabled?: boolean;
  pushAnimation?: boolean;
}

export const Button = styled(Link)`
  width: fit-content;
  padding: 0px 16px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.06);
  will-change: transform;
  transition: 0.1s transform;
  ${robotoMedium()};
  ${noUserSelect()};

  ${({
    icon,
    iconOnRight,
    iconRotation,
    disabled,
    pushAnimation,
  }: Props) => css`
    ${
      icon
        ? css`
            flex-direction: ${iconOnRight ? 'row-reverse' : 'row'};

            &::before {
              content: '';
              width: 20px;
              height: 20px;
              background-color: #000;
              mask-image: url(${icon});
              margin-left: 4px;
              margin-right: 4px;
              transition: 0.1s background-color;
              ${centerIcon(20, true)};

              ${iconRotation != null &&
              css`
                transform: rotate(${iconRotation}deg);
              `}
            }
          `
        : css`
            min-width: 96px;
          `
    }

    ${
      disabled &&
      css`
        opacity: 0.4;
        pointer-events: none;
      `
    }

    ${
      pushAnimation !== false &&
      css`
        &:active {
          transform: scale(0.95);
        }
      `
    }
  `};

  &:hover::after {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.06);
    opacity: 0;
    will-change: opacity;
    transition: 0.1s opacity;
  }
`;

export const PrimaryButton = styled(Button)`
  color: ${PRIMARY_COLOR};
  background-color: rgba(0, 174, 239, 0.08);

  &::before {
    background-color: ${PRIMARY_COLOR};
  }
`;

export const DeleteButton = styled(Button)`
  color: ${ERROR_COLOR};

  &:hover,
  &:focus {
    background-color: rgba(176, 0, 32, 0.12);
  }
`;
