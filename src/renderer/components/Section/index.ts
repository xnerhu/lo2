import styled from 'styled-components';

import { noUserSelect, h5 } from '~/renderer/mixins';
import { GRADIENT } from '~/renderer/constants';

export const Section = styled.section`
  width: 100%;
  margin-top: 32px;
`;

export const SectionTitle = styled.div`
  width: fit-content;
  position: relative;
  padding-bottom: 8px;
  margin-bottom: 24px;
  ${noUserSelect()};
  ${h5()};

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: 0;
    background: ${GRADIENT};
  }
`;
