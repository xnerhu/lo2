import React from 'react';

import { IArticleCategory, IArticle } from '~/interfaces/article';
import { IUser } from '~/interfaces';
import { ArticleDetails } from '../ArticleDetails';
import { StyledArticle, Title, Image, Content, ReadMore } from './style';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  data: IArticle;
  category?: IArticleCategory;
  user?: IUser;
  full?: boolean;
}

export const ArticleList = ({ data, category, user, full }: Props) => {
  return (
    <StyledArticle>
      <Title to={`/article/${data?.label}`}>{data?.title}</Title>
      {user && (
        <ArticleDetails article={data} user={user} category={category} />
      )}
      {data?.image ? <Image src={data.image} ratio={2.75} /> : null}
      {!full ? (
        <Content>{data?.content}</Content>
      ) : (
        <Content dangerouslySetInnerHTML={{ __html: data?.content }} />
      )}
      {!full && <ReadMore to={`/article/${data?.label}`}>Więcej</ReadMore>}
    </StyledArticle>
  );
};
