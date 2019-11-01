import { Router } from 'express';

import news from './news';
import slider from './slider';
import teachers from './teachers';

const router = Router();

router.use(news);
router.use(slider);
router.use(teachers);

export default router;
