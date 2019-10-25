import styled from 'styled-components';

import { aspectRatio } from '~/renderer/mixins';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 32px 0px 48px;

  @media(max-width: 1079px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  max-width: 512px;
  flex: 1;

  & .list-card {
    &:not(:first-child) {
      margin-top: 24px;
    }
  }

  @media(max-width: 1079px) {
    max-width: 100%;
  }
`;

export const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  margin-left: 64px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  ${aspectRatio(16 / 9)};

  @media(max-width: 1079px) {
    margin-left: 0px;
    margin-top: 48px;
  }
`;
