import { Router } from 'express';

import { IRequest } from '../../interfaces';
import { getGallerySections } from '../api/gallery';

const router = Router();

router.get('/gallery', async (req: IRequest, res, next) => {
  const gallerySections = await getGallerySections();

  req.appState = { gallerySections };

  next();
});

export default router;
