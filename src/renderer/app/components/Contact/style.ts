import styled from 'styled-components';

export const Item = styled.div`
  margin-top: 8px;

  &:first-child {
    margin-top: 20px;
  }
`;

export const Map = styled.iframe`
  width: calc(100% - ${512 + 24}px);
  height: 384px;
  border: none;

  @media(max-width: 1216px) {
    width: 100%;
    margin-top: 32px;
  }
`;
