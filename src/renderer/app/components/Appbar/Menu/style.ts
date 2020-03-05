import styled from 'styled-components';

import { Link } from '~/renderer/components/Link';
import { shadows } from '~/renderer/mixins/shadows';

export const StyledMenu = styled.div`
  width: 256px;
  height: auto;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 8px 0px;
  z-index: 10;
  background-color: #fff;
  border-radius: 6px;
  opacity: 0;
  pointer-events: none;
  transition: 0.1s opacity;
  box-shadow: ${shadows(4)};
`;

export const MenuItem = styled(Link)`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.1s background-color;

  &:hover {
    background-color: #f5f5f5;
  }
`;
