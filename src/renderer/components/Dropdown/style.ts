import styled from 'styled-components';

import { robotoMedium } from '~/renderer/mixins/typography';
import { noUserSelect } from '~/renderer/mixins/user-selection';
import { centerIcon } from '~/renderer/mixins/images';
import { CHEVRON_ICON } from '~/renderer/constants/icons';

export const StyledDropdown = styled.div`
  height: 48px;
  padding: 0px 16px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.06);
  will-change: background-color;
  transition: 0.1s background-color;
  ${robotoMedium()};
  ${noUserSelect()};

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

export const Icon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${CHEVRON_ICON});
  margin-left: 4px;
  transform: rotate(90deg);
  ${centerIcon()};
`;
