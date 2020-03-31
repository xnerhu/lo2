import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  CARD_SHADOW,
  EASING_FUNCTION,
  PRIMARY_COLOR,
} from '~/renderer/constants/design';
import { transparency } from '~/renderer/constants/transparency';
import { overline, robotoMedium } from '~/renderer/mixins/typography';
import { noUserSelect } from '~/renderer/mixins/user-selection';

export const StyledNewsCard = styled(Link)`
  width: 100%;

  &:hover > .news-card-wrapper {
    transform: scale(0.95);
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const Wrapper = styled.div`
  width: 100%;
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
  transition: 0.1s ${EASING_FUNCTION} transform, 0.1s background-color;
  backface-visibility: hidden;
`;

export const Container = styled.div`
  padding: 0px 24px;
`;

export const Title = styled.h6`
  color: rgba(0, 0, 0, ${transparency.text.high});
`;

export const Content = styled.div`
  margin-top: 8px;
  line-height: 20px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;

export const Date = styled.div`
  padding: 16px 24px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
  margin-top: auto;
`;
