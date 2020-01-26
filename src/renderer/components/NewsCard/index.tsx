import * as React from 'react';
import { withRouter } from 'react-router';

import { formatDate } from '~/renderer/app/utils';
import { INews } from '~/interfaces';
import { Image } from '../Image';
import { IRouterProps } from '~/renderer/app/interfaces';
import {
  StyledNewsCard,
  Container,
  Content,
  Date,
  Category,
  Title,
} from './style';

interface Props {
  data: INews;
}

export const NewsCard = withRouter(({ data, history }: IRouterProps<Props>) => {
  const { label, image, _category, title, content, createdAt } = data;

  const onCategoryClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    history.push(`/news/`);
  }, []);

  return (
    <StyledNewsCard className="news-card" to={`/article/${label}`}>
      {image && (
        <Image src={image} alt={title} ratio={16 / 9} skeletonBorder={0} />
      )}
      <Container>
        <Category onClick={onCategoryClick}>{_category.name}</Category>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </Container>
      <Date>{formatDate(createdAt)}</Date>
    </StyledNewsCard>
  );
});
