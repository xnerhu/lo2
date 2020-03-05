import styled, { css } from 'styled-components';
import { Editable as EditableArea } from 'slate-react';

import { ERROR_COLOR, PRIMARY_COLOR } from '~/renderer/constants/design';

export const Container = styled.div`
  ${({ error }: { error: boolean }) => css`
    ${error &&
      css`
        & .rich-editor-editable {
          box-shadow: 0 0 0 2px ${ERROR_COLOR};
        }
      `}
  `};
`;

export const Editable = styled(EditableArea)`
  margin-top: 16px;
  padding: 24px;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;

  &:hover,
  &:focus {
    background-color: #fff;
    box-shadow: 0 0 0 2px ${PRIMARY_COLOR};
  }
`;
