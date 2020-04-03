import styled, { css } from 'styled-components';

import { Link } from '../Link';
import { robotoMedium } from '~/renderer/mixins/typography';
import { noUserSelect } from '~/renderer/mixins/user-selection';
import { PRIMARY_COLOR } from '~/renderer/constants/design';
import { centerIcon } from '~/renderer/mixins/images';

export const Button = styled(Link)`
  width: fit-content;
  min-width: 144px;
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
    reversed,
  }: {
    icon?: string;
    iconOnRight?: boolean;
    reversed?: boolean;
  }) => css`
    ${icon &&
    css`
      flex-direction: ${iconOnRight ? 'row-reverse' : 'row'};

      &::before {
        content: '';
        width: 20px;
        height: 20px;
        background-color: ${PRIMARY_COLOR};
        mask-image: url(${icon});
        margin-left: 4px;
        transition: 0.1s background-color;
        ${centerIcon(20, true)};

        ${reversed &&
        css`
          margin-right: 4px;
          transform: rotate(180deg);
        `}
      }
    `}
  `};

  &:active {
    transform: scale(0.95);
  }

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
`;

// export const buttonBase = css`
//   width: fit-content;
//   min-width: 144px;
//   padding: 0px 16px;
//   height: 48px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 16px;
//   cursor: pointer;
//   will-change: background-color, color;
//   transition: 0.15s background-color, 0.15s color;
//   ${robotoMedium()};
//   ${noUserSelect()};
// `;

// export const Button = styled(Link)`
//   color: ${PRIMARY_COLOR};
//   border: 2px solid ${PRIMARY_COLOR};
//   border-radius: 64px;
//   ${buttonBase};

//   ${({
//     disabled,
//     icon,
//     reversedIcon,
//   }: {
//     disabled?: boolean;
//     icon?: string;
//     reversedIcon?: boolean;
//   }) => css`
//     pointer-events: ${disabled ? 'none' : 'all'};
//     opacity: ${disabled ? transparency.text.disabled : 1};

//     ${icon &&
//     css`
//       &::after {
//         content: '';
//         display: block;
//         width: 24px;
//         height: 24px;
//         background-color: ${PRIMARY_COLOR};
//         mask-image: url(${icon});
//         transition: 0.2s background-color;
//         ${centerIcon(24, true)};
//       }

//       &:hover::after {
//         background-color: #fff;
//       }

//       ${reversedIcon &&
//       css`
//         flex-direction: row-reverse;

//         &::after {
//           transform: rotate(-180deg);
//         }
//       `}
//     `}

//     ${!disabled &&
//     css`
//       &:hover {
//         background-color: ${PRIMARY_COLOR};
//         color: #fff;
//       }
//     `}
//   `}
// `;

// export const RaisedButton = styled.div`
//   background-color: rgba(0, 0, 0, 0.06);
//   border-radius: 8px;
//   ${buttonBase};

//   &:hover,
//   &:focus {
//     background-color: rgba(0, 0, 0, 0.12);
//   }
// `;

// export const FlatButton = styled.div`
//   background-color: #fff;
//   border-radius: 8px;
//   color: ${PRIMARY_COLOR};
//   ${buttonBase};

//   &:hover,
//   &:focus {
//     background-color: rgba(0, 174, 239, 0.12);
//   }
// `;

// export const DeleteButton = styled(FlatButton)`
//   color: ${ERROR_COLOR};

//   &:hover,
//   &:focus {
//     background-color: rgba(176, 0, 32, 0.12);
//   }
// `;
