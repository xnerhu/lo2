import styled from 'styled-components';

import { aspectRatio } from '~/renderer/mixins/box';
import { STANDARD_RATIO, PRIMARY_COLOR } from '~/renderer/constants/design';
import { centerIcon } from '~/renderer/mixins/images';
import { centerBoth } from '~/renderer/mixins/positioning';
import { noUserSelect } from '~/renderer/mixins/user-selection';
import { IMAGE_OUTLINE_ICON, CLOSE_ICON } from '~/renderer/constants/icons';

export const StyledImagePick = styled.div`
  width: 344px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.04);
  position: relative;
  cursor: pointer;
  margin-top: 32px;
  overflow: hidden;
  will-change: box-shadow;
  transition: 0.1s box-shadow;
  ${aspectRatio(STANDARD_RATIO, false)};

  &:hover {
    box-shadow: 0 0 0 2px ${PRIMARY_COLOR};

    & .article-image-preview-delete {
      opacity: 1;
    }
  }
`;

export const ImageIcon = styled.div`
  width: 96px;
  height: 96px;
  background-image: url(${IMAGE_OUTLINE_ICON});
  pointer-events: none;
  opacity: 0.12;
  position: absolute;
  ${centerIcon()};
  ${centerBoth()};
`;

export const ImagePreview = styled.img`
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
  background-image: url(${CLOSE_ICON});
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.08);
  opacity: 0;
  transition: 0.1s opacity, 0.1s background-color;
  cursor: not-allowed;
  ${centerIcon(18)};

  &:hover {
    background-color: rgba(0, 0, 0, 0.16);
  }
`;
