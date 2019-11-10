import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { GRADIENT } from '~/renderer/constants';
import { noUserSelect, robotoMedium } from '~/renderer/mixins';

export const Button = styled(Link)`
  width: fit-content;
  padding: 0px 16px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 64px;
  background: ${GRADIENT};
  color: #fff;
  margin: 0 auto;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 8px 24px 0px rgba(246, 16, 80, 0.32);
  transition: 0.1s transform;
  ${noUserSelect()};
  ${robotoMedium()};

  &:hover {
    transform: scale(1.05);
  }
`;
