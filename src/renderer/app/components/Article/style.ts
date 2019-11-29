import styled from 'styled-components';

import { body1 } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';
import { Image } from '~/renderer/components/Image';

export const Info = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
`;

export const AuthorInfo = styled.div`
  padding-left: 16px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;

  &, & a {
    color: rgba(0, 0, 0, ${transparency.text.medium});
  }

  & a:hover {
    text-decoration: underline;
  }
`;

export const StyledAvatar = styled(Image)`
  width: 56px;
  height: 56px;
  border-radius: 100%;
`;

export const Author = styled.div`
  font-size: 20px;
  margin-bottom: 2px;
  color: #000;
`;

export const ArticleImage = styled(Image)`
 margin-top: 24px;
 border-radius: 16px;
`;

export const Body = styled.div`
  margin-top: 24px;
  ${body1()};
`;
