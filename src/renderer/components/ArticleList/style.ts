import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { robotoMedium } from '~/renderer/mixins/typography';
import { Image as LazyImage } from '~/renderer/components/Image';
import { CARD_SHADOW, PRIMARY_COLOR } from '~/renderer/constants/design';

export const StyledArticle = styled.div`
  width: 100%;
  margin-top: 64px;
`;

export const Title = styled(Link)`
  font-size: 32px;
  transition: 0.1s color;
  ${robotoMedium()};

  &:hover {
    color: ${PRIMARY_COLOR};
  }
`;

export const Image = styled(LazyImage)`
  width: 100%;
  height: 256px;
  border-radius: 8px;
  box-shadow: ${CARD_SHADOW};
  margin-bottom: 24px;
`;

export const Content = styled.div`
  font-size: 16px;
  color: #000;
  line-height: 24px;
  margin-top: 8px;
  margin-bottom: 12px;
`;

export const ReadMore = styled(Link)`
  font-size: 14px;
  text-decoration: underline;
  color: ${PRIMARY_COLOR};
`;
