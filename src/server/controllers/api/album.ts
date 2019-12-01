import { Router } from 'express';

import db from '~/server/models/db';
import { IGalleryAlbum } from '~/interfaces';

const router = Router();

export const getAlbum = async (_id: number): Promise<IGalleryAlbum> => {
  if (!Number.isInteger(_id)) return {};

  const [data, pictures] = await Promise.all([
    db.galleryAlbums.findOne({ _id }),
    db.galleryPictures.find({ _albumId: _id }, { sort: { createdAt: false } })
  ]);

  return { ...data, pictures };
}

router.get('/album', async (req, res) => {
  const { _id } = req.query;

  const data = await getAlbum(parseInt(_id));

  res.json(data);
});


export default router;
