import { Router } from 'express';

import PageService from '../services/page';
import { handlePageRoute } from '~/server/utils';

const router = Router();

router.get(
  '/',
  handlePageRoute(req => {
    return PageService.getHomeData();
  }),
);

export default router;
