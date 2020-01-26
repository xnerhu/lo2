import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CARD_SHADOW } from '~/renderer/constants';

export const Card = styled(Link)`
  width: 100%;
  max-width: 344px;
  height: 64px;
  background-color: #fff;
  border-radius: 8px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  font-size: 16px;
  box-shadow: ${CARD_SHADOW};
  transition: 0.1s transform, 0.1s background-color;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    transform: scale(1.05);
  }

  &:not(:first-child) {
    margin-top: 32px;
  }
`;
