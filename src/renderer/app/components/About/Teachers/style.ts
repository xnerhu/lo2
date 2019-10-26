import styled from 'styled-components';

import { robotoMedium } from '~/renderer/mixins';

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 48px;
  grid-row-gap: 48px;
  grid-template-columns: repeat( auto-fit, minmax(256px, 1fr));
  margin-bottom: 48px;
`;

export const Title = styled.div`
  font-size: 18px;
  ${robotoMedium()};
`;

export const StyledSection = styled.ul`
  padding-inline-start: 24px;
`;
