import { Router } from 'express';

import { getHomePagePacket } from '~/server/services';

const router = Router();

router.get('/home', async (res, req) => {
  const data = await getHomePagePacket();

  req.json(data);
});

export default router;
