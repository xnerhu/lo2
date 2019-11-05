import styled, { css } from 'styled-components';

import { transparency, PRIMARY_COLOR, PAGE_ITEM_SIZE, icons } from '~/renderer/constants';
import { noUserSelect, centerIcon, robotoMedium } from '~/renderer/mixins';

export const Toolbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

export const Pages = styled.div`
  width: 100%;
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
  border-top: 1px solid rgba(0, 0, 0, ${transparency.dividers});

  &:first-child {
    margin-right: 24px;
  }

  &:last-child {
    margin-left: 24px;
  }
`;

export const Container = styled.div`
  margin: 0px 16px;
`;

export const Page = styled.div`
  width: ${PAGE_ITEM_SIZE}px;
  height: ${PAGE_ITEM_SIZE}px;
  font-size: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  transition: 0.1s color, 0.1s background-color;
  ${noUserSelect()};

  ${({ selected, disabled }: { selected: boolean, disabled: boolean }) => css`
    background-color: ${selected ? PRIMARY_COLOR : 'transparent'};
    color: ${selected ? '#fff' : '#000'};
    font-weight: ${selected ? 500 : 400};
    opacity: ${disabled ? transparency.text.disabled : 1};
    pointer-events: ${disabled ? 'none' : 'auto'};

    ${!selected && css`
      &:hover {
        color: ${PRIMARY_COLOR};
        font-weight: 500;
      }
    `}
  `}

  &:not(:first-child) {
    margin-left: 4px;
  }
`;

export const Chevron = styled.div`
  width: ${PAGE_ITEM_SIZE}px;
  height: ${PAGE_ITEM_SIZE}px;
  cursor: pointer;
  transition: 0.1s opacity;
  ${centerIcon(20)};

  ${({ double, right, disabled }: { double?: boolean, right?: boolean, disabled?: boolean }) => css`
    background-image: url(${double ? icons.chevronDouble : icons.chevron});
    transform: rotate(${right ? 0 : 180}deg);
    opacity: ${disabled ? transparency.icons.disabled : transparency.icons.inactive};
    pointer-events: ${disabled ? 'none' : 'auto'};
  `}

  &:hover {
    opacity: 1;
  }
`;

export const Error = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ErrorCircle = styled.h3`
  width: 196px;
  height: 196px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, ${transparency.text.disabled});
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0px 24px;
  ${robotoMedium()};
  ${noUserSelect()};
`;

export const ErrorDescription = styled.div`
  margin-top: 4px;
  font-size: 16px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;
