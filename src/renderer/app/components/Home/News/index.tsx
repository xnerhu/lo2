import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Image } from '~/renderer/components/Image';
import { formatNewsDate } from '~/renderer/app/utils';
import { INewsBase } from '~/interfaces';
import { Section, SectionTitle } from '../Section';
import { CardsContainer, StyledCard, Title, Content, Date, MoreButton } from './style';

export const CardImage = ({ src }: { src: string }) => {
  return <Image src={src} ratio={16 / 9} skeletonBorder={0} />;
}

const Card = ({ data }: { data: INewsBase }) => {
  const { image, title, content, createdAt } = data;

  return (
    <StyledCard>
      <CardImage src={image} />
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
      <CardsContainer>
        {store.shortNews.items.map(r => (
          <Card key={r._id} data={r} />
        ))}
      </CardsContainer>
      <MoreButton>Zobacz więcej</MoreButton>
    </Section>
  );
});
