import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { robotoMedium } from '~/renderer/mixins/typography';
import { PRIMARY_COLOR } from '~/renderer/constants/design';

export const StyledArticle = styled.div`
  width: 100%;
  height: auto;
  margin-top: 32px;
  border-radius: 12px;
  background-color: #fff;
  overflow: hidden;
`;

export const Container = styled.div`
  padding: 0px 24px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled(Link)`
  padding: 24px 0px;
  font-size: 32px;
  transition: 0.1s color;
  ${robotoMedium()};

  &:hover {
    color: ${PRIMARY_COLOR};
  }
`;

export const Content = styled.div`
  font-size: 16px;
  color: #000;
  line-height: 24px;
  margin-bottom: 8px;
`;

export const ArticlesContainer = styled.div`
  width: calc(100% - 64px);
  max-width: 768px;
  margin: 0 auto;
  padding-bottom: 32px;
`;
