import { Router } from 'express';

import { getPersonnelPacket } from '~/server/services';

const router = Router();

router.get('/personnel', async (res, req) => {
  const data = await getPersonnelPacket();

  req.json(data);
});

export default router;
