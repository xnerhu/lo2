import { Router } from 'express';

import home from './home';
import news from './news';
// import teachers from './teachers';

import view from './view';

const router = Router();

router.use(home);
router.use(news);
// router.use(teachers);

router.use(view);

export default router;
