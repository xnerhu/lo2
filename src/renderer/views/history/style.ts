import styled from 'styled-components';

import { robotoMedium } from '~/renderer/mixins/typography';

export const StyledHistory = styled.div`
  font-size: 16px;
`;

export const Container = styled.div`
  width: 100%;
  margin: 32px auto 0px;
  display: flex;

  & > .dynamic-image:not(:first-child) {
    margin-left: 24px;
  }

  @media (max-width: 967px) {
    width: fit-content;
    flex-direction: column;

    & > .dynamic-image {
      margin-left: 0px !important;
    }

    & > .dynamic-image:not(:first-child) {
      margin-top: 24px;
    }
  }
`;

export const MastersContainer = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 16px;
  grid-row-gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export const MasterName = styled.div`
  margin-top: 12px;
  margin-bottom: 4px;
  ${robotoMedium()};
`;
