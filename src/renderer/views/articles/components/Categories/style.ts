import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { Content } from '~/renderer/components/Section';
import { transparency } from '~/renderer/constants/transparency';
import { robotoMedium } from '~/renderer/mixins/typography';
import { noUserSelect } from '~/renderer/mixins/user-selection';
import { Dropdown as StyledDropdown } from '~/renderer/components/Dropdown';

export const StyledCategories = styled(Content)`
  padding: 4px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  visibility: hidden;
`;

const ItemStyle = css`
  font-size: 14px;
  padding: 0px 16px;
  color: rgba(0, 0, 0, ${transparency.text.medium});

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const Item = styled(Link)`
  height: 48px;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 4px;
  display: flex;
  align-items: center;
  ${ItemStyle};
  ${robotoMedium()};
  ${noUserSelect()};
`;

export const Dropdown = styled(StyledDropdown)`
  background-color: unset;
  ${ItemStyle};

  & > .drop-down-icon {
    opacity: ${transparency.icons.inactive};
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
