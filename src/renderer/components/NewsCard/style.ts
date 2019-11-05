import styled from 'styled-components';

import { transparency } from '~/renderer/constants';
import { noUserSelect, overline } from '~/renderer/mixins';

export const Category = styled.div`
  color: rgba(0, 0, 0, ${transparency.text.medium});
  margin-bottom: 6px;
  ${overline()};
  ${noUserSelect()};
`;

export const Container = styled.div`
  padding: 16px 24px 0px;
`;

export const Content = styled.div`
  margin-top: 4px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;

export const Date = styled.div`
  padding: 16px 24px;
  margin-top: auto;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;
