import styled from 'styled-components';

import { NEWS_CARD_MARGIN } from '~/renderer/constants';

export const StyledNewsContainer = styled.div`
  display: flex;
`;

export const StyledColumn = styled.div`
  & > a:not(:first-child) { 
    margin-top: ${NEWS_CARD_MARGIN}px;
  }

  &:not(:last-child) {
    margin-right: ${NEWS_CARD_MARGIN}px;
  }
`;
