import * as React from 'react';

import { formatDate } from '~/renderer/app/utils';
import { INews } from '~/interfaces';
import { CardImage } from '../Card';
import { StyledCard } from '../Card/style';
import { Container, Content, Date, Category } from './style';

export const NewsCard = ({ data }: { data: INews }) => {
  const { image, category, title, content, createdAt } = data;

  return (
    <StyledCard>
      {image && <CardImage src={image} />}
      <Container>
        <Category>
          {category}
        </Category>
        <h6>
          {title}
        </h6>
        <Content>
          {content}
        </Content>
      </Container>
      <Date>
        {formatDate(createdAt)}
      </Date>
    </StyledCard>
  );
}
