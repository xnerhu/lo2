import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Content } from '~/renderer/components/Section';
import { transparency } from '~/renderer/constants/transparency';
import { robotoMedium } from '~/renderer/mixins/typography';
import { noUserSelect } from '~/renderer/mixins/user-selection';
import { centerIcon } from '~/renderer/mixins/images';
import { CHEVRON_ICON } from '~/renderer/constants/icons';

export const StyledCategories = styled(Content)`
  display: flex;
  align-items: center;
  height: 500px;
  /* visibility: hidden; */
`;

export const Item = styled(Link)`
  font-size: 14px;
  padding: 20px 16px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
  cursor: pointer;
  white-space: nowrap;
  ${robotoMedium()};
  ${noUserSelect()};

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
`;
