import React from 'react';

import { IArticleCategory, IArticle } from '~/interfaces/article';
import { IUser } from '~/interfaces';
import { ArticleDetails } from '../ArticleDetails';
import { StyledArticle, Title, Image, Content, ReadMore } from './style';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  data: IArticle;
  category?: IArticleCategory;
  user?: IUser;
}

export const ArticleList = ({ data, category, user }: Props) => {
  return (
    <StyledArticle>
      <Title to={`/article/${data.label}`}>{data.title}</Title>
      <ArticleDetails article={data} user={user} category={category} />
      {data.image ? <Image src={data.image} ratio={2.75} /> : null}
      <Content>{data.content}</Content>
      <ReadMore to={`/article/${data.label}`}>Więcej</ReadMore>
    </StyledArticle>
  );
};
