import styled from 'styled-components';

import { Error as StyledError } from '~/renderer/components/Error';

export const Error = styled(StyledError)`
  margin-bottom: 24px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
