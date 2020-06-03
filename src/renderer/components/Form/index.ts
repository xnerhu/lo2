import styled from 'styled-components';

import { Button } from '../Button';
import { CARD_SHADOW } from '~/renderer/constants/design';

export const FormContainer = styled.form`
  width: 100%;
  max-width: 512px;
  margin: 0 auto;
  padding: 0px 24px 32px;
  border-radius: 8px;
  margin-top: 16px;
  box-shadow: ${CARD_SHADOW};
`;

export const FormContent = styled.div`
  & > input:not(:first-child) {
    margin-top: 16px;
  }
`;

export const SubmitButton = styled(Button)`
  min-width: 96px;
  height: 36px;
  margin-top: 24px;
  font-size: 14px;
`;
