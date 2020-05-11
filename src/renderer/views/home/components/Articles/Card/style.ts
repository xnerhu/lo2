import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CARD_SHADOW } from '~/renderer/constants/design';
import { transparency } from '~/renderer/constants/transparency';

export const StyledArticleCard = styled(Link)`
  height: 100%;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  font-size: 14px;
  position: relative;
  box-shadow: ${CARD_SHADOW};
  will-change: transform, background-color;
  transition: 0.1s transform, 0.1s background-color;
  backface-visibility: hidden;

  &:hover .article-card-title {
    text-decoration: underline;
  }

  &:active {
    transform: scale(0.95);
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const Container = styled.div`
  padding: 0px 24px;
`;

export const Title = styled.h6`
  padding: 12px 0px;
  margin-top: 8px;
`;

export const Content = styled.div`
  line-height: 20px;
  color: rgba(0, 0, 0, ${transparency.text.high});
`;

export const Date = styled.div`
  margin-top: auto;
  padding: 24px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;
