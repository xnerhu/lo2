import styled from 'styled-components';
import { Editable as EditableArea } from 'slate-react';

import { transparency } from '~/renderer/constants';

export const Editable = styled(EditableArea)`
  margin-top: 16px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
`;

export const StyledToolbar = styled.div`
  width: 100%;
  height: 48px;
  background-color: #fff;
  border-radius: 8px;
  padding-left: 24px;
`;
