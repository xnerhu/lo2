import { Router } from 'express';

import PageService from '../services/page';
import { handlePageRoute } from '~/server/utils';

const router = Router();

router.get('/', handlePageRoute('home', PageService.getHomeData));

export default router;
