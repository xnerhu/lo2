import React from 'react';

import { IArticleCategory, IArticle } from '~/interfaces/article';
import { IUser } from '~/interfaces';
import { Details } from './Details';
import { Image } from '../Image';
import { ARTICLE_IMAGE_RATIO } from '~/constants/design';
import { StyledArticle, Container, Title, Content } from './style';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  data: IArticle;
  category?: IArticleCategory;
  user?: IUser;
}

export const Article = ({ data, category, user }: Props) => {
  return (
    <StyledArticle>
      {data?.image ? (
        <Image
          src={data.image}
          ratio={ARTICLE_IMAGE_RATIO}
          skeletonBorder={0}
        />
      ) : null}
      <Container>
        <Title to={`/artykul/${data?.label}`}>{data?.title}</Title>
        {user && <Details article={data} user={user} category={category} />}
        <Content dangerouslySetInnerHTML={{ __html: data?.content }} />
      </Container>
    </StyledArticle>
  );
};
