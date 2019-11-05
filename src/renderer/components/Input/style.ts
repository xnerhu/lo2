import styled from 'styled-components';

import { Icon } from '../Icon';
import { centerVertical, noUserSelect } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';

export const Container = styled.div`
  width: 348px;
  height: 36px;
  border-radius: 64px;
  overflow: hidden;
  position: relative;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.08);
  border: none;
  outline: none;
  padding-left: 40px;

  &:hover, &:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    ${noUserSelect()};
  }
`;

export const SearchIcon = styled(Icon)`
  position: absolute;
  left: 12px;
  opacity: ${transparency.icons.disabled};
  ${centerVertical()};
`;
