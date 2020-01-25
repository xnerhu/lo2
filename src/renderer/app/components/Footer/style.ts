import styled, { css } from 'styled-components';

import {
  noUserSelect,
  robotoRegular,
  robotoLight,
  robotoMedium,
  centerIcon,
  centerBoth,
} from '~/renderer/mixins';
import {
  transparency,
  FOOTER_WIDTH,
  FOOTER_COLOR,
  MOBILE_VIEW,
  icons,
} from '~/renderer/constants';

export const StyledFooter = styled.footer`
  width: 100%;
  min-height: 128px;
  margin-top: auto;
`;

export const Container = styled.div`
  width: calc(100% - 64px);
  max-width: ${FOOTER_WIDTH}px;
  margin: 0 auto;
`;

export const Title = styled.div`
  font-size: 24px;
  ${robotoMedium()};
`;

export const Subtitle = styled(Title)`
  font-size: 16px;
`;

export const Label = styled.div`
  font-size: 14px;

  &:not(:first-child) {
    margin-top: 16px;
  }
`;

export const ColumnContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const Column = styled.div`
  &:not(:first-child) {
    margin-left: 32px;
  }
`;

export const StyledSocial = styled.div`
  margin-top: 32px;
  border-top: 1px solid rgba(0, 0, 0, ${transparency.dividers});

  & > div {
    height: 96px;
    display: flex;
    align-items: center;
  }
`;

export const Icon = styled.a`
  width: 48px;
  height: 48px;
  cursor: pointer;
  position: relative;
  ${centerIcon(24)};

  &:first-child {
    margin-left: -16px;
  }

  &:not(:first-child) {
    margin: 8px;
  }

  &::before {
    content: '';
    width: 48px;
    height: 48px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.06);
    opacity: 0;
    border-radius: 100%;
    pointer-events: none;
    transition: 0.1s opacity;
    ${centerBoth()};
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const FacebookIcon = styled(Icon)`
  background-image: url(${icons.facebook});
  ${centerIcon(14)};
`;

export const YoutubeIcon = styled(Icon)`
  background-image: url(${icons.youtube});
`;

export const Copyright = styled.a`
  font-size: 16px;
  margin-left: auto;
  ${robotoMedium()};
`;
