import styled from 'styled-components';

export const StyledArticles = styled.div`
  width: calc(100% - 64px);
  max-width: 768px;
  margin: 0 auto;

  & > .article-card {
    display: flex;
    margin-top: 24px;
  }
`;
