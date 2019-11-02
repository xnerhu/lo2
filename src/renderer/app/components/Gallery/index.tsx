import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Image } from '~/renderer/components/Image';
import { IGallerySection, IGalleryAlbum } from '~/interfaces';
import { SectionContainer, Header, StyledAlbum, Title } from './style';

const Section = ({ data }: { data: IGallerySection }) => {
  const { label, albums } = data;

  return (
    <>
      <Header>{label}</Header>
      <SectionContainer>
        {albums.map(r => (
          <Album key={r.title} data={r} />
        ))}
      </SectionContainer>
    </>
  )
}

const Album = ({ data }: { data: IGalleryAlbum }) => {
  const { title, image } = data;

  return (
    <StyledAlbum to='/gallery'>
      <Image src={image} />
      <Title>{title}</Title>
    </StyledAlbum>
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
