import styled from 'styled-components';

import { robotoRegular, noUserSelect } from '~/renderer/mixins';

export const Title = styled.div`
  font-size: 20px;
  padding: 20px 24px;
  ${robotoRegular()};
  ${noUserSelect()};
`;
