import styled from 'styled-components';
import { aspectRatio } from '~/renderer/mixins';

export const Container = styled.div`
  width: 100%;
  margin: 32px auto 0px;
  display: flex;

  & > .dynamic-image:not(:first-child) {
    margin-left: 24px;
  }

  @media(max-width: 967px) {
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
  grid-template-columns: repeat( auto-fit, minmax(200px, 1fr));
`;

export const Item = styled.div`
 
`;
