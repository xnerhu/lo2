import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { transparency, PAGE_ITEM_SIZE, PRIMARY_COLOR, icons } from '~/renderer/constants';
import { noUserSelect, centerIcon } from '~/renderer/mixins';

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

export const Page = styled(Link)`
  width: ${PAGE_ITEM_SIZE}px;
  height: ${PAGE_ITEM_SIZE}px;
  font-size: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  transition: 0.1s color;
  position: relative;
  ${noUserSelect()};

  ${({ selected, disabled }: { selected: boolean, disabled: boolean }) => css`
    color: ${selected ? '#fff' : '#000'};
    font-weight: ${selected ? 500 : 400};
    opacity: ${disabled ? transparency.text.disabled : 1};
    pointer-events: ${disabled ? 'none' : 'auto'};

    &::before {
      width: ${selected ? 100 : 0}%;
      height: ${selected ? 100 : 0}%;
    }

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

  &::before {
    content: '';
    display: block;
    background-color: ${PRIMARY_COLOR};
    position: absolute;
    z-index: -1;
    border-radius: 100%;
    pointer-events: none;
    transition: 0.1s ease-out width, 0.1s ease-out height;
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
