import styled, { css } from 'styled-components';

import { centerVertical, noUserSelect, centerIcon } from '~/renderer/mixins';
import { transparency, icons, EASING_FUNCTION } from '~/renderer/constants';

export const Container = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 64px;
  overflow: hidden;
  position: relative;
  transition: 0.15s ${EASING_FUNCTION} max-width;

  ${({ focused }: { focused: boolean }) => css`
    max-width: ${focused ? 768 : 384}px;
  `}
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding-left: 40px;
  padding-right: 16px;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.06);

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    ${noUserSelect()};
  }
`;

export const SearchIcon = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 12px;
  opacity: ${transparency.icons.disabled};
  background-image: url(${icons.search});
  ${centerVertical()};
  ${centerIcon()};
`;
