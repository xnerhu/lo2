import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { transparency, CARD_SHADOW, PRIMARY_COLOR } from '~/renderer/constants';
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
  transition: 0.1s transform;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Container = styled.div`
  padding: 0px 24px;
`;

export const Category = styled(Link)`
  margin-top: 16px;
  margin-bottom: 8px;
  display: block;
  color: rgba(0, 0, 0, ${transparency.text.medium});
  ${overline()};
  ${noUserSelect()};

  &:hover {
    color: ${PRIMARY_COLOR};
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
  padding: 16px 0px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;
