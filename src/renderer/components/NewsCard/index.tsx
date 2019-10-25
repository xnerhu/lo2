import * as React from 'react';

import { formatDate } from '~/renderer/app/utils';
import { INews } from '~/interfaces';
import { CardImage } from '../Card';
import { StyledCard } from '../Card/style';
import { Title, Content, Date } from './style';

export const NewsCard = ({ data }: { data: INews }) => {
  const { image, title, content, createdAt } = data;

  return (
    <StyledCard>
      <CardImage src={image} />
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Date>{formatDate(createdAt)}</Date>
    </StyledCard>
  );
}
