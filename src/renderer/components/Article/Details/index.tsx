import React from 'react';

import { IArticle, IArticleCategory } from '~/interfaces/article';
import { IUser } from '~/interfaces';
import { formatArticleDate } from '~/renderer/utils/date';
import { StyledDetails, Avatar, Container, Author, Category } from './style';

interface Props {
  article: IArticle;
  user: IUser;
  category: IArticleCategory;
}

export const Details = ({ article, user, category }: Props) => {
  return (
    <StyledDetails>
      <Avatar src={user.image} ratio={1} skeletonBorder="100%" />
      <Container>
        <Author>
          {user.firstName} {user.lastName}
        </Author>
        <span>
          {formatArticleDate(article)}
          <Category to={`/news/${category.label}`}>{category.name}</Category>
        </span>
      </Container>
    </StyledDetails>
  );
};
