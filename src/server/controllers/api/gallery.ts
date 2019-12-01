import { Router } from 'express';

import db from '~/server/models/db';
import { formatGallerySections } from '~/server/utils';

const router = Router();

export const getGallerySections = async () => {
  const albums = await db.galleryAlbums.find({}, {
    sort: { createdAt: false }
  })

  const sections = formatGallerySections(albums);

  return sections;
}

router.get('/gallery', async (req, res) => {
  const data = await getGallerySections();

  res.json(data);
});


export default router;
