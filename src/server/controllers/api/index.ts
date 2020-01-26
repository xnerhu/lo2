import { Router } from 'express';

import slider from './slider';
import news from './news';
// import teachers from './teachers';

const router = Router();

router.use(slider);
router.use(news);
// router.use(teachers);

export default router;
