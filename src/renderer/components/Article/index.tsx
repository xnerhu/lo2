import React from 'react';

import { INews } from '~/interfaces';
import { Image } from '../Image';
import { formatDate } from '~/renderer/app/utils/date';
import { StyledArticleCard, Container, Content, Date, Title } from './style';
import { WIDE_RATIO } from '~/renderer/constants/design';

export const Article = ({ data }: { data: INews }) => {
  const { label, image, title, content, createdAt } = data;

  return (
    <StyledArticleCard className="article" to={`/article/${label}`}>
      {image ? (
        <Image src={image} alt={title} ratio={WIDE_RATIO} skeletonBorder={0} />
      ) : null}
      <Container>
        <Title className="article-title">{title}</Title>
        <Content>{content}</Content>
      </Container>
      <Date>{formatDate(createdAt)}</Date>
    </StyledArticleCard>
  );
};
