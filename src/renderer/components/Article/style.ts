import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { robotoMedium } from '~/renderer/mixins/typography';
import { PRIMARY_COLOR } from '~/renderer/constants/design';
import { transparency } from '~/renderer/constants/transparency';
import { ICON_FORMAT_QUOTE } from '~/renderer/constants/icons';
import { centerIcon } from '~/renderer/mixins/images';
import { noUserSelect } from '~/renderer/mixins/user-selection';
import { SECONDARY_COLOR } from '~/renderer/constants/colors';

export const articleContentCss = css`
  & a.article-link {
    color: ${PRIMARY_COLOR};
  }

  & code {
    background-color: rgba(0, 0, 0, 0.08);
  }

  & blockquote {
    color: rgba(0, 0, 0, ${transparency.text.medium});

    &::before {
      content: '';
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 4px;
      background-image: url(${ICON_FORMAT_QUOTE});
      opacity: ${transparency.icons.disabled};
      ${centerIcon()};
      ${noUserSelect()}
    }
  }

  & p {
    &.align-left {
      text-align: left;
    }

    &.align-center {
      text-align: center;
    }

    &.align-right {
      text-align: right;
    }
  }

  & span.article-color-highlight {
    color: ${SECONDARY_COLOR};
  }

  & img.article-image {
    display: block;
    max-width: 100%;
    max-height: 20em;
    margin-left: auto;
    margin-right: auto;
    border-radius: 16px;
  }
`;

export const StyledArticle = styled.div`
  width: 100%;
  height: auto;
  margin-top: 32px;
  border-radius: 12px;
  background-color: #fff;
  overflow: hidden;
`;

export const Container = styled.div`
  padding: 0px 24px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled(Link)`
  padding: 24px 0px;
  font-size: 32px;
  transition: 0.1s color;
  ${robotoMedium()};

  &:hover {
    color: ${PRIMARY_COLOR};
  }
`;

export const ArticlesContainer = styled.div`
  width: calc(100% - 64px);
  max-width: 768px;
  margin: 0 auto;
  padding-bottom: 32px;
`;

export const Content = styled.div`
  font-size: 16px;
  color: #000;
  line-height: 24px;
  margin-bottom: 8px;
  ${articleContentCss};
`;
