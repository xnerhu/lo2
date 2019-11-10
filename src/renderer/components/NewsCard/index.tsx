import * as React from 'react';

import { formatDate } from '~/renderer/app/utils';
import { INews } from '~/interfaces';
import { Image } from '../Image';
import { StyledNews, Container, Content, Date, Category } from './style';


export const NewsCard = ({ data }: { data: INews }) => {
  const { _id, image, category, title, content, createdAt } = data;

  return (
    <StyledNews to={`/news/${_id}`}>
      {image && <Image alt={title} src={image} ratio={16 / 9} skeletonBorder={0} />}
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
    </StyledNews>
  );
}
