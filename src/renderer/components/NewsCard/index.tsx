import * as React from 'react';

import { formatDate } from '~/renderer/app/utils';
import { INews } from '~/interfaces';
import { Image } from '../Image';
import {
  StyledNewsCard,
  Container,
  Content,
  Date,
  Category,
  Title,
} from './style';

export const NewsCard = ({ data }: { data: INews }) => {
  const { _id, image, category, title, content, createdAt } = data;

  return (
    <StyledNewsCard to={`/article/${_id}`}>
      {image && (
        <Image src={image} alt={title} ratio={16 / 9} skeletonBorder={0} />
      )}
      <Container>
        <Category>{category}</Category>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <Date>{formatDate(createdAt)}</Date>
      </Container>
    </StyledNewsCard>
  );
};
