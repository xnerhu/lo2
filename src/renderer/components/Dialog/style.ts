import styled, { css } from 'styled-components';

import { noUserSelect } from '~/renderer/mixins/user-selection';

export const StyledDialog = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  opacity: 0;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.48);
    z-index: -1;
  }

  ${({ visible }: { visible: boolean }) =>
    visible &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`;

export const Container = styled.div`
  width: 100%;
  max-width: 512px;
  border-radius: 8px;
  background-color: #fff;
  padding: 0px 20px;
`;

export const Title = styled.h6`
  padding: 20px 0px;
  ${noUserSelect()};
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

  & > *:first-child {
    margin-right: 8px;
  }
`;
