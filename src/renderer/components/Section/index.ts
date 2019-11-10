import styled from 'styled-components';

import { noUserSelect } from '~/renderer/mixins';
import { GRADIENT } from '~/renderer/constants';

export const Section = styled.section`
  width: 100%;
  margin-top: 32px;
`;

export const SectionTitle = styled.h4`
  /* width: fit-content;
  position: relative;
  padding-bottom: 8px;
  margin-bottom: 24px;
  ${noUserSelect()};

  &::after {
    content: '';
    display: block;
    width: 100%;
    max-width: 128px;
    height: 2px;
    position: absolute;
    bottom: 0;
    background: ${GRADIENT};
  } */
  padding-bottom: 8px;
  margin-bottom: 26px;
  ${noUserSelect()};
`;
