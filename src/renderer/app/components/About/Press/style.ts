import styled from 'styled-components';

export const Link = styled.a`
  &:not(:first-child) > li {
    margin-top: 16px;
  }

  &:hover {
    text-decoration: underline;
  }
`;
