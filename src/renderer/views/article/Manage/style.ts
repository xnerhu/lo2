import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;

  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;
