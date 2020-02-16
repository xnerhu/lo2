import styled from 'styled-components';

import { Button } from '../Button';

export const FormContainer = styled.form`
  width: 100%;
  max-width: 512px;
  margin: 0 auto;
  padding: 0px 24px 32px;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  margin-top: 16px;
`;

export const FormContent = styled.div`
  & > input:not(:first-child) {
    margin-top: 16px;
  }
`;

export const SubmitButton = styled(Button)`
  height: 36px;
  font-size: 14px;
  min-width: 96px;
  margin-top: 24px;
`;
