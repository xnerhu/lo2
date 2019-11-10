import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CARD_SHADOW } from '~/renderer/constants';

export const StyledCard = styled(Link)`
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

export const CardsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-row-gap: 48px;
  grid-column-gap: 48px;
  grid-template-columns: repeat(auto-fill, minmax(348px, 1fr));
`;
