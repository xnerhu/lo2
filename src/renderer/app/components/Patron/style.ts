import styled from 'styled-components';

import { longText } from '~/renderer/mixins';
import { MOBILE_VIEW } from '~/renderer/constants';
import { Image as DynamicImage } from '~/renderer/components/Image';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;

  @media(max-width: ${MOBILE_VIEW}px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  flex: 1;
  ${longText()};

  @media(max-width: ${MOBILE_VIEW}px) {
    max-width: 100%;
  }
`;

export const Image = styled(DynamicImage)`
  width: 100%;
  max-width: 320px;
  height: 100%;
  margin-left: 64px;
  position: relative;
  border-radius: 16px;
  flex: 1;

  @media(max-width: ${MOBILE_VIEW}px) {
    margin-left: auto;
    margin-right:auto;
    margin-top: 48px;
  }
`;
