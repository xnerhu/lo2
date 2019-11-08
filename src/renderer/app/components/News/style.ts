import styled from 'styled-components';

import { transparency } from '~/renderer/constants';
import { noUserSelect, robotoMedium } from '~/renderer/mixins';

export const Toolbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

export const StyledError = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ErrorCircle = styled.h3`
  width: 196px;
  height: 196px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, ${transparency.text.disabled});
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0px 24px;
  ${robotoMedium()};
  ${noUserSelect()};
`;

export const ErrorDescription = styled.div`
  margin-top: 4px;
  font-size: 16px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;
