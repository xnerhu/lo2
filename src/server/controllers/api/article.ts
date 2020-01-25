import { Router } from 'express';

import { getArticle } from '~/server/services';

const router = Router();

router.get('/article', async (req, res) => {
  const data = await getArticle(req.query.id);

  res.json(data);
});

export default router;
