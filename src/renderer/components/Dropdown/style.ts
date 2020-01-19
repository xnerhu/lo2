import styled, { css } from 'styled-components';

import {
  noUserSelect,
  singleLine,
  shadows,
  noButtons,
  centerIcon,
  robotoMedium,
} from '~/renderer/mixins';
import { transparency, icons, EASING_FUNCTION } from '~/renderer/constants';

export const StyledDropdown = styled.div`
  cursor: pointer;
  height: 96px;
  display: flex;
  align-items: center;
  position: relative;
  ${noUserSelect()};

  &:hover .drop-down-icon {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

export const Label = styled.h5`
  ${robotoMedium()};
  ${singleLine()};
`;

export const DropIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 2px;
  opacity: ${transparency.icons.inactive};
  transition: 0.2s ${EASING_FUNCTION} transform;
  background-image: url(${icons.drop});
  border-radius: 100%;
  ${centerIcon(20)};

  ${({ expanded }: { expanded: boolean }) => css`
    transform: ${expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  `}
`;

export const Menu = styled.div`
  width: 256px;
  max-height: 264px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8px;
  position: absolute;
  top: 100%;
  z-index: 9;
  padding: 8px 0px;
  box-shadow: ${shadows(6)};
  transition: 0.2s opacity, 0.2s margin-top;
  transition-timing-function: ${EASING_FUNCTION};
  ${noButtons()};

  ${({ expanded }: { expanded: boolean }) => css`
    opacity: ${expanded ? 1 : 0};
    pointer-events: ${expanded ? 'auto' : 'none'};
    margin-top: ${expanded ? 0 : -16}px;
  `}
`;

export const MenuItem = styled.div`
  width: 100%;
  padding: 8px 12px;
  font-size: 13px;

  ${({ selected }: { selected: boolean }) => css`
    background-color: ${selected ? 'rgba(0, 0, 0, 0.1)' : 'none'};

    &:hover {
      background-color: rgba(0, 0, 0, ${selected ? 0.1 : 0.06});
    }
  `}
`;
