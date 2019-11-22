import { Router } from 'express';

import slider from './slider';
import shortNews from './short-news';
import news from './news';
// import teachers from './teachers';
// import gallery from './gallery';

const router = Router();

router.use(slider);
router.use(shortNews);
router.use(news);
// router.use(teachers);
// router.use(gallery);

export default router;
