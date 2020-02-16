import styled from 'styled-components';

export const StyledItem = styled.div`
  font-size: 16px;

  &:not(:first-child) {
    margin-top: 8px;
  }
`;

export const Map = styled.iframe`
  width: 100%;
  height: 384px;
  border: none;
  margin-top: 48px;
  margin-bottom: 16px;
`;
