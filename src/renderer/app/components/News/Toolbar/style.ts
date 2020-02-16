import styled from 'styled-components';

import { RaisedButton } from '~/renderer/components/Button';

export const StyledToolbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled(RaisedButton)`
  margin-left: auto;
`;
