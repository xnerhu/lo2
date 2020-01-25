import { Router } from 'express';

import { getSliderItems } from '~/server/services';

const router = Router();

router.get('/slider', async (req, res) => {
  const data = await getSliderItems();

  res.json(data);
});

export default router;
