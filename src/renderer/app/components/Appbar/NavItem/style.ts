import styled, { css } from 'styled-components';

import { transparency, icons, APPBAR_MOBILE_VIEW } from '~/renderer/constants';
import { centerIcon } from '~/renderer/mixins';
import { Link as DynamicLink } from '~/renderer/components/Link';

export const StyledNavItem = styled.div`
  display: flex;
  align-items: center;
  border-radius: 64px;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  color: rgba(0, 0, 0, ${transparency.text.high});
  transition: 0.1s background-color;

  @media (min-width: ${APPBAR_MOBILE_VIEW + 1}px) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);

      & .nav-menu {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }

  @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
    height: 100%;
    min-height: 64px;
    flex-direction: column;
    justify-content: center;

    & .nav-menu {
      display: none;
    }
  }
`;

export const Link = styled(DynamicLink)`
  height: 52px;
  font-size: 16px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({
    selected,
    hasSubpages,
  }: {
    selected: boolean;
    hasSubpages: boolean;
  }) => css`
    font-weight: ${selected ? 500 : 400};
    padding-right: ${hasSubpages ? 0 : 16}px;
  `}

  @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
    width: 100%;
    height: 100%;
    padding: 0px;
  }
`;

export const ExpandIcon = styled.div`
  width: 20px;
  height: 20px;
  opacity: ${transparency.icons.disabled};
  background-image: url(${icons.chevron});
  margin-left: 4px;
  margin-right: 8px;
  transform: rotate(90deg);
  border-radius: 100%;
  ${centerIcon(20)};

  @media (max-width: ${APPBAR_MOBILE_VIEW}px) {
    display: none;
  }
`;
