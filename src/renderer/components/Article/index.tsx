import React from 'react';

import { IArticleCategory, IArticle } from '~/interfaces/article';
import { IUser } from '~/interfaces';
import { Details } from './Details';
import { StyledArticle, Title, Image, Content } from './style';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  data: IArticle;
  category?: IArticleCategory;
  user?: IUser;
}

export const Article = ({ data, category, user }: Props) => {
  return (
    <StyledArticle>
      <Title to={`/article/${data?.label}`}>{data?.title}</Title>
      {user && <Details article={data} user={user} category={category} />}
      {data?.image ? <Image src={data.image} ratio={2.75} /> : null}
      <Content dangerouslySetInnerHTML={{ __html: data?.content }} />
    </StyledArticle>
  );
};
