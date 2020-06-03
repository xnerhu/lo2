import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins/images';
import { noUserSelect } from '~/renderer/mixins/user-selection';
import { PRIMARY_COLOR } from '~/renderer/constants/design';
import { Link } from '~/renderer/components/Link';

export const StyledBottombar = styled.div`
  width: 100%;
  height: 56px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.12);
  opacity: 0;
  z-index: 10;
  bottom: -24px;
  pointer-events: none;
  transition: 0.2s ease-out bottom, 0.1s opacity;

  ${({ visible }: { visible: boolean }) =>
    visible &&
    css`
      opacity: 1;
      bottom: 0;
      pointer-events: auto;
    `};
`;

export const StyledItem = styled(Link)`
  width: 48px;
  height: auto;
  border-radius: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: 0.1s ease-out margin-top;
  ${noUserSelect()};

  ${({ icon, selected }: { icon: string; selected?: boolean }) => css`
    &::before {
      mask-image: url(${icon});
    }

    ${selected &&
    css`
      margin-top: -8px;

      &::before {
        background-color: ${PRIMARY_COLOR} !important;
      }

      &::after {
        content: '';
      }
    `}
  `}

  &:not(:first-child) {
    margin-left: 24px;
  }

  &::before {
    content: '';
    width: 48px;
    height: 48px;
    background-color: #b0bec5;
    transition: 0.1s background-color;
    ${centerIcon(24, true)};
  }

  &::after {
    width: 4px;
    height: 4px;
    background-color: ${PRIMARY_COLOR};
    border-radius: 100%;
    position: absolute;
    bottom: 2px;
  }

  &:hover::before {
    background-color: ${PRIMARY_COLOR};
  }
`;
