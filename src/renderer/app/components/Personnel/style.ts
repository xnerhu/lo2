import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 48px;
  grid-row-gap: 48px;
  grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
  margin-bottom: 48px;
`;

export const Label = styled.div`
  font-size: 14px;
  margin-top: 8px;

  &:first-child {
    margin-top: 16px;
  }
`;
