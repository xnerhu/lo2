import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Image } from '~/renderer/components/Image';
import { IGallerySection, IGalleryAlbum } from '~/interfaces';
import { StyledSection, Header, StyledAlbum, Title } from './style';

const Section = ({ data }: { data: IGallerySection }) => {
  const { label, albums } = data;

  return (
    <>
      <Header>{label}</Header>
      <StyledSection>
        {albums.map(r => (
          <Album key={r.title} data={r} />
        ))}
      </StyledSection>
    </>
  )
}

const Album = ({ data }: { data: IGalleryAlbum }) => {
  const { _id, title, image } = data;

  return (
    <StyledAlbum to={`/gallery/${_id}`}>
      <Image src={image} ratio={1} />
      <Title>{title}</Title>
    </StyledAlbum>
  )
}

export default observer(() => {
  const store = useStore();

  return (
    <>
      {store.gallery.sections.map(r => (
        <Section key={r.label} data={r} />
      ))}
    </>
  );
});
