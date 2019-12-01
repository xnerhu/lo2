import styled from 'styled-components';

import { transparency, icons, MOBILE_VIEW } from '~/renderer/constants';
import { centerIcon } from '~/renderer/mixins';
import { Image } from '~/renderer/components/Image';

export const Info = styled.div`
  display: flex;
  align-items: center;
`;

export const Year = styled.div`
  font-size: 20px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;

export const Title = styled.div`
  font-size: 20px;
`;

export const Chevron = styled.div`
  width: 20px;
  height: 20px;
  opacity: ${transparency.icons.disabled};
  background-image: url(${icons.chevron});
  pointer-events: none;
  margin: 0px 4px;
  ${centerIcon()};
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 18px;
  margin-left: -4px;
`;

export const StyledColumn = styled.div`
  flex: 25%;
  max-width: 25%;
  padding: 0px 2px;

  @media screen and (max-width: ${MOBILE_VIEW}px) {
    flex: 33.33%;
    max-width: 33.33%;
  }

  @media screen and (max-width: 800px) {
    flex: 50%;
    max-width: 50%;
  }

  @media screen and (max-width: 600px) {
    flex: 100%;
    max-width: 100%;
  }
`;

export const Picture = styled(Image)`
  width: 100%;
  margin-bottom: 4px;

  &.fetched {
    margin-bottom: 0px;
  }

  & img {
    border-radius: 8px;
    overflow: hidden;
    pointer-events: auto;
  }
`;
