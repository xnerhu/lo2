import styled from 'styled-components';

import { noUserSelect } from '~/renderer/mixins/user-selection';
import { aspectRatio } from '~/renderer/mixins/box';

export const StyledDraggableImg = styled.div`
  width: 100%;
  cursor: move;
  overflow: hidden;
  position: relative;
  ${noUserSelect()};
  /* ${aspectRatio(16 / 9, false)}; */
  background-color: blue; 
`;

export const Img = styled.img`
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
`;
