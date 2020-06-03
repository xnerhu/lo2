import styled from 'styled-components';

import { robotoMedium } from '~/renderer/mixins/typography';
import { FOOTER_MOBILE_VIEW } from '~/renderer/constants/design';
import { transparency } from '~/renderer/constants/transparency';
import {
  BADGE,
  ICON_YOUTUBE,
  ICON_FACEBOOK,
  BIP,
} from '~/renderer/constants/icons';
import { centerIcon } from '~/renderer/mixins/images';
import { centerBoth } from '~/renderer/mixins/positioning';
import { Content } from '~/renderer/components/Section';

export const StyledFooter = styled.footer`
  width: 100%;
  margin-top: auto;
  background-color: #fff;
`;

export const Title = styled.div`
  font-size: 24px;
  ${robotoMedium()};
`;

export const Subtitle = styled(Title)`
  font-size: 16px;
`;

export const StyledHeader = styled.div`
  padding: 24px 0px;
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(3, auto);
  grid-row-gap: 16px;
  grid-column-gap: 32px;

  @media (max-width: ${FOOTER_MOBILE_VIEW}px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, auto);
  }
`;

export const Link = styled.a`
  padding: 16px 0px;
  cursor: pointer;
  ${robotoMedium()};

  &:hover {
    text-decoration: underline;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const StyledSocial = styled.div`
  border-top: 1px solid #eceff1;
  margin-top: 16px;
`;

export const SocialContent = styled(Content)`
  height: 96px;
  display: flex;
  align-items: center;
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
  background-image: url(${ICON_FACEBOOK});
  ${centerIcon(14)};
`;

export const YoutubeIcon = styled(Icon)`
  background-image: url(${ICON_YOUTUBE});
`;

export const Bip = styled(Icon)`
  background-image: url(${BIP});
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

export const Badge = styled(Icon)`
  width: 96px;
  height: 96px;
  ${centerIcon()};
  background-image: url(${BADGE});
  pointer-events: none;
`;
