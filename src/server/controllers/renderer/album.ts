import { Router } from 'express';

import { IRequest } from '../../interfaces';
import { getAlbum } from '../api/album';

const router = Router();

router.get('/gallery/:_id', async (req: IRequest, res, next) => {
  const { _id } = req.params;

  const album = await getAlbum(parseInt(_id));

  req.appState = { album };

  next();
});

export default router;
