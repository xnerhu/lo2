import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { longText } from '~/renderer/mixins';
import { transparency, PRIMARY_COLOR } from '~/renderer/constants';
import { Image } from '~/renderer/components/Image';

export const StyledView = styled.div`
  width: calc(100% - 64px);
  max-width: 768px;
  margin: 0 auto;
  margin-bottom: 48px;
`;

export const Info = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;

export const AuthorInfo = styled.div`
  margin-left: 12px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 14px;

  &,
  & a {
    color: rgba(0, 0, 0, ${transparency.text.medium});
  }

  & a:hover {
    text-decoration: underline;
  }
`;

export const Category = styled(Link)`
  font-size: 14px;
  margin-left: 8px;
  text-decoration: underline;
  color: ${PRIMARY_COLOR} !important;
`;

export const StyledAvatar = styled(Image)`
  width: 46px;
  height: 46px;
  border-radius: 100%;
`;

export const Author = styled.div`
  color: #000;
  margin-bottom: 2px;
`;

export const ArticleImage = styled(Image)`
  margin-top: 24px;
  border-radius: 16px;
`;

export const Body = styled.div`
  margin-top: 24px;
  ${longText()};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 32px;

  & > div:first-child {
    margin-right: 16px;
  }
`;
