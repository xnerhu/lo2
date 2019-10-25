import styled, { css } from 'styled-components';

import { aspectRatio } from '~/renderer/mixins';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;

  @media(max-width: 1079px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  max-width: 512px;
  flex: 1;

  & .list-card {
    margin-top: 24px;
  }

  @media(max-width: 1079px) {
    max-width: 100%;
  }
`;

export const ImgContainer = styled.div`
  height: 100%;
  margin-left: 64px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;

  ${({ vertical }: { vertical?: boolean }) => css`
    width: ${vertical ? '320px' : 'auto'};
    flex: ${vertical ? 'unset' : 1};
    ${aspectRatio(vertical ? 9 / 16 : 16 / 9)};

    @media(max-width: 1079px) {
      margin-left: ${vertical ? 'auto' : '0px'};
      margin-right: auto;
      margin-top: 48px;
    }
  `}
`;
