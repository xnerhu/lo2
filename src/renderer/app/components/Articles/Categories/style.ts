import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { PRIMARY_COLOR } from '~/renderer/constants/design';
import { robotoMedium } from '~/renderer/mixins/typography';
import { centerIcon } from '~/renderer/mixins/images';
import { CHEVRON_ICON } from '~/renderer/constants/icons';
import { transparency } from '~/renderer/constants/transparency';
import { Content } from '~/renderer/components/Section';

export const StyledCategories = styled(Content)`
  display: flex;
  padding: 0px 16px;
`;

export const Button = styled.div`
  width: 24px;
  min-height: 100%;
  background-image: url(${CHEVRON_ICON});
  cursor: pointer;
  ${centerIcon(24)};

  ${({ disabled }: { disabled: boolean }) => css`
    pointer-events: ${disabled ? 'none' : 'auto'};
    opacity: ${disabled
      ? transparency.icons.disabled
      : transparency.icons.inactive};

    ${!disabled &&
    css`
      &:hover {
        opacity: 1;
      }
    `}
  `}

  &:first-child {
    transform: rotate(180deg);
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0px 16px;
  overflow-y: hidden;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Item = styled(Link)`
  white-space: nowrap;
  padding: 20px 16px;
  font-size: 14px;
  will-change: color;
  transition: 0.1s color;
  ${robotoMedium()};

  ${({ selected }: { selected: boolean }) => css`
    color: ${selected
      ? PRIMARY_COLOR
      : ` rgba(0, 0, 0, ${transparency.text.medium})`};
  `}

  &:hover {
    color: ${PRIMARY_COLOR};
  }
`;
