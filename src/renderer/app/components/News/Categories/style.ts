import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CONTENT_WIDTH, PRIMARY_COLOR } from '~/renderer/constants/design';
import { robotoMedium } from '~/renderer/mixins/typography';
import { centerIcon } from '~/renderer/mixins/images';
import { CHEVRON_ICON } from '~/renderer/constants/icons';
import { transparency } from '~/renderer/constants/transparency';

export const Background = styled.div`
  width: 100%;
  background-color: #fafafc;
`;

export const StyledCategories = styled.div`
  width: 100%;
  max-width: ${CONTENT_WIDTH}px;
  display: flex;
  margin: 0 auto;
`;

export const Button = styled.div`
  width: 24px;
  min-height: 100%;
  background-image: url(${CHEVRON_ICON});
  opacity: ${transparency.icons.inactive};
  cursor: pointer;
  ${centerIcon(24)};

  &:hover {
    opacity: 1;
  }

  &:first-child {
    transform: rotate(180deg);
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0px 16px;
  overflow-y: hidden;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Item = styled(Link)`
  white-space: nowrap;
  padding: 20px 16px;
  font-size: 14px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
  ${robotoMedium()};
  will-change: color;
  transition: 0.1s color;

  &:hover {
    color: ${PRIMARY_COLOR};
  }
`;