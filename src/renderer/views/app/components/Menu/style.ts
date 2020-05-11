import styled, { css } from 'styled-components';

import { Link } from '~/renderer/components/Link';
import { centerIcon } from '~/renderer/mixins/images';
import { ICON_CLOSE } from '~/renderer/constants/icons';

export const StyledMenu = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 64px 0px;
  opacity: 0;
  pointer-events: none;
  transition: 1s opacity;

  ${({ visible }: { visible: boolean }) =>
    visible &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`;

export const Item = styled(Link)`
  font-size: 20px;
`;

export const Close = styled.div`
  width: 48px;
  height: 48px;
  background-image: url(${ICON_CLOSE});
  border-radius: 100%;
  cursor: pointer;
  ${centerIcon(24)};

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
`;
