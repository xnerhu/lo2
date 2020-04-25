import React from 'react';

import { IArticle, IArticleCategory } from '~/interfaces/article';
import { IUser } from '~/interfaces';
import { formatArticleDate } from '~/renderer/app/utils/date';
import { StyledDetails, Avatar, AuthorInfo, Author, Category } from './style';

interface Props {
  article: IArticle;
  user: IUser;
  category: IArticleCategory;
}

export const ArticleDetails = ({ article, user, category }: Props) => {
  return (
    <StyledDetails>
      <Avatar src={user.image} ratio={1} skeletonBorder="100%" />
      <AuthorInfo>
        <Author>
          {user.firstName} {user.lastName}
        </Author>
        <span>
          {formatArticleDate(article)}
          <Category to={`/news/${category.label}`}>{category.name}</Category>
        </span>
      </AuthorInfo>
    </StyledDetails>
  );
};
