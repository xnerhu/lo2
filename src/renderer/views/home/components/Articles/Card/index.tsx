import React from 'react';

import { IArticle } from '~/interfaces';
import { Image } from '~/renderer/components/Image';
import { formatDate } from '~/renderer/utils/date';
import { StyledArticleCard, Container, Content, Date, Title } from './style';

export const ArticleCard = ({ data }: { data: IArticle }) => {
  const { label, image, title, content, createdAt } = data;

  return (
    <StyledArticleCard to={`/article/${label}`}>
      {image ? (
        <Image src={image} alt={title} ratio={16 / 9} skeletonBorder={0} />
      ) : null}
      <Container>
        <Title className="article-card-title">{title}</Title>
        <Content>{content}</Content>
      </Container>
      <Date>{formatDate(createdAt)}</Date>
    </StyledArticleCard>
  );
};
