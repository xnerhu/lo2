import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { GALLERY_CARD_SIZE, GALLERY_CARD_MARGIN } from '~/renderer/constants';
import { robotoMedium, noUserSelect } from '~/renderer/mixins';

export const Header = styled.div`
  font-size: 16px;
  margin-bottom: 16px;

  &:not(:first-child) {
    margin-top: 32px;
  }
`;

export const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: -${GALLERY_CARD_MARGIN}px -${GALLERY_CARD_MARGIN}px 0px 0px;

  &:last-child {
    margin-bottom: 64px;
  }
`;

export const StyledAlbum = styled(Link)`
  width: ${GALLERY_CARD_SIZE}px;
  height: ${GALLERY_CARD_SIZE}px;
  overflow: hidden;
  position: relative;
  margin: ${GALLERY_CARD_MARGIN}px ${GALLERY_CARD_MARGIN}px 0px 0px;
  cursor: pointer;
  transition: 0.1s transform;
  ${noUserSelect()};

  &:hover {
    transform: scale(1.05);
  }

  & .dynamic-image {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
  }
`;

export const Title = styled.div`
  font-size: 16px;
  color: #fff;
  position: absolute;
  bottom: 0;
  padding: 16px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.16);
  ${robotoMedium()};
`;
