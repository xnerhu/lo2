import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { PRIMARY_COLOR } from '~/renderer/constants';
import { noUserSelect, robotoMedium } from '~/renderer/mixins';

export const Button = styled(Link)`
  width: fit-content;
  padding: 0px 16px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 64px;
  background-color: ${PRIMARY_COLOR};
  color: #fff;
  margin: 0 auto;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  ${noUserSelect()};
  ${robotoMedium()};

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    background-color: rgba(255, 255, 255, 0.12);
    opacity: 0;
    transition: 0.1s opacity;
  }

  &:hover::before {
    opacity: 1;
  }
`;
