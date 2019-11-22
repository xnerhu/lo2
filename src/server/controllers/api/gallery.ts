import { Router } from 'express';

import db from '~/server/models/db';
import { IGallerySection } from '~/interfaces';

const router = Router();

export const getGallerySections = async () => {
  const albums = await db.gallery.find({}, {
    sort: { createdAt: false }
  })

  const sections: IGallerySection[] = [];

  for (const album of albums) {
    const year = album.createdAt.getFullYear();
    let section = sections.find(r => r.year === year);

    if (!section) {
      section = {
        year,
        albums: [],
        label: `${year}-${year + 1}`
      }

      sections.push(section);
    }

    section.albums.push(album);
  }

  return sections;
}

router.get('/gallery', async (req, res) => {
  const data = await getGallerySections();

  res.json(data);
});


export default router;
