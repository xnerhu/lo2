import styled from 'styled-components';

import { transparency } from '~/renderer/constants/transparency';
import { robotoMedium } from '~/renderer/mixins/typography';
import { noUserSelect } from '~/renderer/mixins/user-selection';
import { ERROR_COLOR } from '~/renderer/constants/design';

export const StyledError = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 64px;
`;

export const Circle = styled.h3`
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

export const Description = styled.div`
  margin-top: 4px;
  font-size: 16px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;

export const StyledErrorLabel = styled.div`
  font-size: 14px;
  margin-top: 16px;
  margin-bottom: 8px;
  color: ${ERROR_COLOR};
  ${robotoMedium()};
`;
