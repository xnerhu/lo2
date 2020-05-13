import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { robotoMedium } from '~/renderer/mixins/typography';
import { Image as LazyImage } from '~/renderer/components/Image';
import { CARD_SHADOW, PRIMARY_COLOR } from '~/renderer/constants/design';

export const StyledArticle = styled.div`
  width: 100%;
  height: auto;
  margin-top: 32px;
  padding: 0px 24px;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Title = styled(Link)`
  padding: 24px 0px 16px;
  font-size: 32px;
  transition: 0.1s color;
  ${robotoMedium()};

  &:hover {
    color: ${PRIMARY_COLOR};
  }
`;

export const Image = styled(LazyImage)`
  width: 100%;
  border-radius: 8px;
  box-shadow: ${CARD_SHADOW};
  margin-bottom: 24px;
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
`;
