import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { transparency, CARD_SHADOW } from '~/renderer/constants';
import { noUserSelect, overline } from '~/renderer/mixins';

export const StyledNews = styled(Link)`
  height: fit-content;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  font-size: 14px;
  box-shadow: ${CARD_SHADOW};
  transition: 0.1s transform;
  user-select: auto;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Category = styled.div`
  color: rgba(0, 0, 0, ${transparency.text.medium});
  margin-bottom: 6px;
  ${overline()};
  ${noUserSelect()};
`;

export const Container = styled.div`
  padding: 16px 24px 0px;
`;

export const Content = styled.div`
  margin-top: 4px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;

export const Date = styled.div`
  padding: 16px 24px;
  margin-top: auto;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;

export const NewsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-row-gap: 48px;
  grid-column-gap: 48px;
  grid-template-columns: repeat(auto-fill, minmax(348px, 1fr));

  @media(max-width: 872px) {
    grid-template-columns: unset;
  }
`;
