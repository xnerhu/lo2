import styled from 'styled-components';

import { transparency } from '~/renderer/constants';
import { h6, body2, noUserSelect } from '~/renderer/mixins';

export const Title = styled.div`
  padding: 16px 24px 8px;
  ${h6()}
`;

export const Content = styled.div`
  color: rgba(0, 0, 0, ${transparency.text.medium});
  padding: 0px 24px 16px;
  ${body2()};
`;

export const Date = styled(Content)`
  padding: 0px 24px 16px;
  margin-top: auto;
  ${noUserSelect()};
`;
