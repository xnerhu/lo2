import { Router } from 'express';

import home from './home';
import news from './news';
import article from './article';
import gallery from './gallery';
import album from './album';
import teachers from './teachers';

import view from './view';

const router = Router();

router.use(home);
router.use(news);
router.use(article);
router.use(gallery);
router.use(album);
router.use(teachers);

router.use(view);

export default router;
