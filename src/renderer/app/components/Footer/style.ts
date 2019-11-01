import styled, { css } from 'styled-components';

import { centerIcon, noUserSelect } from '~/renderer/mixins';
import { transparency, FOOTER_WIDTH, FOOTER_COLOR, PRIMARY_COLOR } from '~/renderer/constants';

export const StyledFooter = styled.footer`
  width: 100vw;
  background-color: ${FOOTER_COLOR};
  margin-top: 32px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${FOOTER_WIDTH}px;
  margin: 0 auto;
  padding-bottom: 32px;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, ${transparency.dividers});
  justify-content: space-between;
`;

export const Column = styled.div`
  min-width: 196px;
  height: 100%;
  margin-top: 32px;
`;

export const Title = styled.h6`
  ${noUserSelect()};
`;

export const Subtitle = styled(Title)`
  font-size: 16px;
`;

export const Contact = styled.div`
  width: 100%;
  display: flex;
`;

export const StyledContactItem = styled.div`
  display: flex;
  margin-top: 24px;

  &:not(:first-child) {
    margin-left: 24px;
  }
`;

export const ContactIcon = styled.div`
  background-color: ${PRIMARY_COLOR};
  margin-right: 8px;
  ${centerIcon('contain', true)};

  ${({ size, src }: { size?: number, src: string }) => css`
    width: ${size || 36}px;
    height: ${size || 36}px;
    mask-image: url(${src});
  `}
`;

export const Icon = styled.div`
  width: 32px;
  height: 32px;
  display: inline-flex;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, ${transparency.icons.inactive});
  transition: 0.15s background-color;
  cursor: pointer;
  ${centerIcon(32, true)};

  ${({ src, fillColor }: { src: string, fillColor: string }) => css`
    mask-image: url(${src});
    background-color: ${fillColor};
  `}
`;

export const Label = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, ${transparency.text.high});
`;

export const Copyright = styled.a`
  width: fit-content;
  display: block;
  padding: 24px 0px;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
