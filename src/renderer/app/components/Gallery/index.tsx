import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Image } from '~/renderer/components/Image';
import { IGallerySection, IGalleryItem } from '~/interfaces';
import { SectionContainer, Header, StyledItem, Title } from './style';

const Section = ({ data }: { data: IGallerySection }) => {
  const { label, items } = data;

  return (
    <>
      <Header>{label}</Header>
      <SectionContainer>
        {items.map(r => (
          <Item key={r.title} data={r} />
        ))}
      </SectionContainer>
    </>
  )
}

const Item = ({ data }: { data: IGalleryItem }) => {
  const { title, images } = data;
  const [src] = images;

  return (
    <StyledItem>
      <Image src={src} />
      <Title>{title}</Title>
    </StyledItem>
  )
}

export const Gallery = observer(() => {
  const store = useStore();

  return (
    <>
      {store.gallery.items.map(r => (
        <Section key={r.label} data={r} />
      ))}
    </>
  );
});
