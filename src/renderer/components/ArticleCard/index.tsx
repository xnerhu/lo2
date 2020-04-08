import React from 'react';

import { INews } from '~/interfaces';
import { Image } from '../Image';
import { formatDate } from '~/renderer/app/utils/date';
import { StyledArticleCard, Container, Content, Date, Title } from './style';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  data: INews;
}

export const ArticleCard = ({ data, ...props }: Props) => {
  const { label, image, title, content, createdAt } = data;

  return (
    <StyledArticleCard
      className="article-card"
      to={`/article/${label}`}
      {...props}
    >
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
