import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Image } from '~/renderer/components/Image';
import { formatNewsDate } from '~/renderer/app/utils';
import { INewsBase } from '~/interfaces';
import { Section, SectionTitle } from '../Section';
import { StyledNews, StyledCard, Title, Content, Date } from './style';

const Card = ({ data }: { data: INewsBase }) => {
  const { image, title, content, createdAt } = data;

  return (
    <StyledCard>
      <Image src={image} ratio={16 / 9} skeletonBorder={0} />
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Date>{formatNewsDate(createdAt)}</Date>
    </StyledCard>
  );
}

export const ShortNews = observer(() => {
  const store = useStore();

  return (
    <Section>
      <SectionTitle>Nowości</SectionTitle>
      <StyledNews>
        {store.shortNews.items.map(r => (
          <Card key={r._id} data={r} />
        ))}
      </StyledNews>
    </Section>
  );
});
