import React from 'react';

import { IArticle, IArticleCategory } from '~/interfaces/article';
import { IUser } from '~/interfaces';
import { formatArticleDate } from '~/renderer/utils/date';
import { StyledDetails, Avatar, Container, Author, Category } from './style';

interface Props {
  article: IArticle;
  user: IUser;
  category: IArticleCategory;
  subcategory?: IArticleCategory;
}

export const Details = ({ article, user, category, subcategory }: Props) => {
  return (
    <StyledDetails>
      <Avatar src={user.image} ratio={1} skeletonBorder="100%" />
      <Container>
        <Author>
          {user.firstName} {user.lastName}
        </Author>
        <span>
          {formatArticleDate(article)}
          <Category to={`/blog/${category.label}`}>{category.name}</Category>
          {subcategory && (
            <Category
              to={`/blog/${category.label}?subcategory=${subcategory.label}`}
            >
              {subcategory.name}
            </Category>
          )}
        </span>
      </Container>
    </StyledDetails>
  );
};
