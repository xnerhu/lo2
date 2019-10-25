import styled from 'styled-components';

import { robotoRegular, noUserSelect, centerIcon } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';

export const Icon = styled.div`
  width: 32px;
  height: 32px;
  opacity: ${transparency.icons.inactive};
  margin-left: 16px;
  ${centerIcon(28)};
`;

export const Title = styled.div`
  font-size: 18px;
  margin-left: 8px;
  ${robotoRegular()};
  ${noUserSelect()};
`;
