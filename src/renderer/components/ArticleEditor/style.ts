import styled from 'styled-components';

import { Dropdown as StyledDropdown } from '../Dropdown';
import { Input as StyledInput } from '../Input';
import { PRIMARY_COLOR } from '~/renderer/constants/design';

export const Dropdown = styled(StyledDropdown)`
  width: fit-content;
  margin: 24px 0px;
`;

export const Input = styled(StyledInput)`
  height: 64px;
  background-color: #fff;
  border-radius: 8px;
  font-size: 16px;
  padding: 0px 24px;
  will-change: box-shadow;
  transition: 0.1s box-shadow;

  &::placeholder {
    color: rgba(0, 0, 0, 0.333);
  }

  &:hover,
  &:focus {
    background-color: #fff;
    box-shadow: 0 0 0 2px ${PRIMARY_COLOR};
  }
`;
