import styled from 'styled-components';

import { noUserSelect } from '~/renderer/mixins';

export const Input = styled.input`
  width: 100%;
  height: 36px;
  background-color: rgba(0, 0, 0, 0.08);
  border: none;
  outline: none;
  padding-left: 16px;
  border-radius: 64px;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    ${noUserSelect()};
  }
`;
