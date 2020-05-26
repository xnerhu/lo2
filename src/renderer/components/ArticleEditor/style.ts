import styled from 'styled-components';

import { Dropdown as StyledDropdown } from '../Dropdown';
import { Input as StyledInput } from '../Input';
import { PRIMARY_COLOR, STANDARD_RATIO } from '~/renderer/constants/design';
import { Content } from '../Section';
import { aspectRatio } from '~/renderer/mixins/box';
import { ICON_IMAGE_OUTLINE } from '~/renderer/constants/icons';
import { centerIcon } from '~/renderer/mixins/images';
import { centerBoth } from '~/renderer/mixins/positioning';

export const StyledArticleEditor = styled(Content)`
  padding-bottom: 48px;
`;

export const Toolbar = styled.div`
  width: 100%;
  display: flex;
  margin: 24px 0px;
  justify-content: space-between;
`;

export const Dropdown = styled(StyledDropdown)`
  width: fit-content;
`;

export const Input = styled(StyledInput)`
  height: 64px;
  background-color: #fff;
  border-radius: 8px;
  font-size: 16px;
  padding: 0px 24px;
  will-change: box-shadow;
  transition: 0.1s box-shadow;

  &::placeholder {
    color: rgba(0, 0, 0, 0.333);
  }

  &:hover,
  &:focus {
    background-color: #fff;
    box-shadow: 0 0 0 2px ${PRIMARY_COLOR};
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eceff1;
  margin: 24px auto;
`;

export const ImageButton = styled.div`
  max-width: 344px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #eceff1;
  position: relative;
  will-change: border-color;
  transition: 0.1s border-color;
  ${aspectRatio(STANDARD_RATIO, false)};

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #eceff1;
    mask-image: url(${ICON_IMAGE_OUTLINE});
    ${centerIcon(96, true)};
    ${centerBoth()};
  }

  &:hover {
    border-color: ${PRIMARY_COLOR};
  }
`;
