import styled from 'styled-components';

import { transparency } from '~/renderer/constants';
import { noUserSelect } from '~/renderer/mixins';

export const Title = styled.h6`
  padding: 16px 24px 8px;
`;

export const Content = styled.div`
  padding: 0px 24px 16px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;

export const Date = styled(Content)`
  padding: 0px 24px 16px;
  margin-top: auto;
  ${noUserSelect()};
`;
