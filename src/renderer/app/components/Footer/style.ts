import styled from 'styled-components';

import { Link as DynamicLink } from '~/renderer/components/Link';
import { robotoMedium } from '~/renderer/mixins/typography';
import { FOOTER_MOBILE_VIEW } from '~/renderer/constants/design';
import { transparency } from '~/renderer/constants/transparency';
import { centerIcon } from '~/renderer/mixins/images';
import { centerBoth } from '~/renderer/mixins/positioning';
import { FACEBOOK_ICON, YOUTUBE_ICON } from '~/renderer/constants/icons';

export const StyledFooter = styled.footer`
  width: 100%;
  min-height: 128px;
  margin-top: auto;
`;

export const Title = styled.div`
  font-size: 24px;
  ${robotoMedium()};
`;

export const Subtitle = styled(Title)`
  font-size: 16px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto auto;
  font-size: 14px;
  margin-top: 32px;

  @media (max-width: ${FOOTER_MOBILE_VIEW}px) {
    width: 100%;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
  }
`;

export const StyledDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(3, auto);
  grid-row-gap: 16px;
  grid-column-gap: 16px;

  @media (max-width: ${FOOTER_MOBILE_VIEW}px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, auto);
  }
`;

export const StyledLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 16px;
  grid-column-gap: 16px;

  @media (max-width: ${FOOTER_MOBILE_VIEW}px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, auto);
    margin-top: 24px;
  }
`;

export const Link = styled(DynamicLink)`
  font-size: 14px;
  cursor: pointer;
  ${robotoMedium()};

  &:hover {
    text-decoration: underline;
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
  background-image: url(${FACEBOOK_ICON});
  ${centerIcon(14)};
`;

export const YoutubeIcon = styled(Icon)`
  background-image: url(${YOUTUBE_ICON});
`;

export const Copyright = styled.a`
  font-size: 16px;
  margin-left: auto;
  text-align: right;
  ${robotoMedium()};

  &:hover {
    text-decoration: underline;
  }
`;
