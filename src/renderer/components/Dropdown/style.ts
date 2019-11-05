import styled, { css } from 'styled-components';

import { noUserSelect, singleLine, shadows, noButtons } from '~/renderer/mixins';
import { Icon } from '../Icon';
import { transparency } from '~/renderer/constants';

export const StyledDropdown = styled.div`
  width: 200px;
  height: 32px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  ${noUserSelect()};
`;

export const Label = styled.div`
  font-size: 13px;
  margin-left: 12px;
  ${singleLine()};
`;

export const DropIcon = styled(Icon)`
  margin-left: auto;
  margin-right: 4px;
  opacity: ${transparency.icons.inactive};
  transition: 0.1s ease-out transform;

  ${({ expanded }: { expanded: boolean }) => css`
    transform: ${expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  `}
`;

export const Menu = styled.div`
  width: 100%;
  max-height: 264px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8px;
  position: absolute;
  top: 100%;
  z-index: 9;
  padding: 8px 0px;
  box-shadow: ${shadows(6)};
  transition: 0.1s opacity, 0.1s ease-out margin-top;
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
