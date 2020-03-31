import React from 'react';

import { INews } from '~/interfaces';
import { Image } from '../Image';
import { formatDate } from '~/renderer/app/utils/date';
import {
  StyledNewsCard,
  Wrapper,
  Container,
  Content,
  Date,
  Title,
} from './style';

export const ArticleCard = ({ data }: { data: INews }) => {
  const { label, image, title, content, createdAt } = data;

  return (
    <StyledNewsCard className="news-card" to={`/article/${label}`}>
      <Wrapper className="news-card-wrapper">
        {image ? (
          <Image src={image} alt={title} ratio={16 / 9} skeletonBorder={0} />
        ) : null}
        <Container>
          <Title>{title}</Title>
          <Content>{content}</Content>
        </Container>
        <Date>{formatDate(createdAt)}</Date>
      </Wrapper>
    </StyledNewsCard>
  );
};
