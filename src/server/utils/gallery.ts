import { IGalleryAlbum, IGallerySection } from '~/interfaces';
import { formatGalleryAlbumYear } from '~/utils';

export const formatGallerySections = (data: IGalleryAlbum[]) => {
  const sections: IGallerySection[] = [];

  data.forEach(r => {
    const year = r.createdAt.getFullYear();
    let section = sections.find(r => r.year === year);

    if (!section) {
      section = {
        year,
        albums: [],
        label: formatGalleryAlbumYear(r.createdAt),
      }

      sections.push(section);
    }

    section.albums.push(formatGalleryAlbum(r));
  });

  return sections;
}

export const formatGalleryAlbum = (data: IGalleryAlbum): IGalleryAlbum => {
  return {
    ...data,
    image: `/static/gallery/${data._id}/${data.image}`,
  }
}
