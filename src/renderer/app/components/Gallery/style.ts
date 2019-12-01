import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { GALLERY_CARD_MARGIN, transparency } from '~/renderer/constants';
import { robotoMedium, noUserSelect } from '~/renderer/mixins';

export const Header = styled.div`
  font-size: 20px;
  margin-bottom: 16px;
  ${robotoMedium()};

  &:not(:first-child) {
    margin-top: 32px;
  }
`;

export const StyledSection = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  &:last-child {
    margin-bottom: 64px;
  }
`;

const getAlbumFlex = (columns: number) => {
  return css`
    flex-basis: calc(100% / ${columns} - ${GALLERY_CARD_MARGIN}px - 1px);
  `;
}

export const StyledAlbum = styled(Link)`
  margin-right: ${GALLERY_CARD_MARGIN}px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 0.1s transform;
  ${getAlbumFlex(6)};
  ${noUserSelect()};

  &:hover {
    transform: scale(1.05);
  }

  & .dynamic-image {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
  }

  @media(max-width: 1536px) {
    ${getAlbumFlex(5)};
  }

  @media(max-width: 1280px) {
    ${getAlbumFlex(4)};
  }

  @media(max-width: 1024px) {
    ${getAlbumFlex(3)};
  }

  @media(max-width: 768px) {
    ${getAlbumFlex(2)};
  }

  @media(max-width: 512px) {
    flex-basis: 100%;
  }
`;

export const Title = styled.div`
  margin-top: 12px;
  margin-bottom: 24px;
  font-size: 16px;
  color: rgba(0, 0, 0, ${transparency.text.high});
  ${robotoMedium()};
`;
