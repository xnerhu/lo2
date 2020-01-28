import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  transparency,
  CARD_SHADOW,
  PRIMARY_COLOR,
  EASING_FUNCTION,
} from '~/renderer/constants';
import { noUserSelect, overline, robotoMedium } from '~/renderer/mixins';

export const StyledNewsCard = styled(Link)`
  width: 100%;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  font-size: 14px;
  position: relative;
  box-shadow: ${CARD_SHADOW};
  will-change: transform;
  transition: 0.1s ${EASING_FUNCTION} transform;
  -webkit-backface-visibility: hidden;

  &:hover {
    transform: scale(0.95);
  }
`;

export const Container = styled.div`
  padding: 0px 24px;
`;

export const Category = styled.div`
  margin-top: 16px;
  margin-bottom: 8px;
  display: block;
  color: rgba(0, 0, 0, ${transparency.text.medium});
  ${overline()};
  ${noUserSelect()};

  &:hover {
    color: ${PRIMARY_COLOR};
    text-decoration: underline;
    ${robotoMedium()};
  }
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
