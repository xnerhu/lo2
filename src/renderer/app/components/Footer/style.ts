import styled, { css } from 'styled-components';

import { h6, robotoRegular, centerIcon, noUserSelect } from '~/renderer/mixins';
import { transparency, FOOTER_WIDTH } from '~/renderer/constants';

export const StyledFooter = styled.footer`
  width: 100vw;
  background-color: #fafafa;
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${FOOTER_WIDTH}px;
  margin: 0 auto;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, ${transparency.dividers});
  justify-content: space-between;
  padding: 24px 0px 32px;
`;

export const Section = styled.section`
  min-width: 196px;
  height: 100%;
`;

export const Title = styled.div`
  padding-bottom: 8px;
  color: rgba(0, 0, 0, 0.7);
  ${h6()};
  ${noUserSelect()};
`;

export const Text = styled.div`
  font-size: 16px;
  ${robotoRegular()};
`;

export const Icon = styled.div`
  width: 32px;
  height: 32px;
  display: inline-flex;
  background-color: rgba(0, 0, 0, ${transparency.icons.inactive});
  transition: 0.15s background-color;
  cursor: pointer;
  ${centerIcon(32, true)};

  ${({ src, hoverColor }: { src: string, hoverColor: string }) => css`
    mask-image: url(${src});

    &:hover {
      background-color: ${hoverColor};
    }
  `}
`;

export const Copyright = styled.a`
  width: fit-content;
  display: block;
  padding: 24px 0px;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    color: #2196F3;
  }
`;
