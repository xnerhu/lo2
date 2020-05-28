import styled, { css } from 'styled-components';

import { aspectRatio } from '~/renderer/mixins/box';
import { STANDARD_RATIO, PRIMARY_COLOR } from '~/renderer/constants/design';
import { ICON_IMAGE_OUTLINE, ICON_CLOSE } from '~/renderer/constants/icons';
import { centerIcon } from '~/renderer/mixins/images';
import { centerBoth } from '~/renderer/mixins/positioning';
import { noUserSelect } from '~/renderer/mixins/user-selection';

export const StyledImageButton = styled.div`
  max-width: 344px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  will-change: border-color;
  transition: 0.1s border-color;
  ${aspectRatio(STANDARD_RATIO, false)};

  ${({ hasImage }: { hasImage: boolean }) => css`
    border: ${hasImage ? '2px solid transparent' : '2px dashed #eceff1'};

    ${!hasImage &&
    css`
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
    `}
  `};

  &:hover {
    border: 2px solid ${PRIMARY_COLOR};

    & .image-button-delete {
      opacity: 1;
    }
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: #fff;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
  ${noUserSelect()};
`;

export const DeleteIcon = styled.div`
  width: 32px;
  height: 32px;
  background-image: url(${ICON_CLOSE});
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 100%;
  background-color: rgba(2555, 255, 255, 0.48);
  opacity: 0;
  z-index: 2;
  transition: 0.1s opacity, 0.1s background-color;
  cursor: not-allowed;
  ${centerIcon(18)};

  &:hover {
    background-color: rgba(2555, 255, 255, 0.79);
  }
`;
