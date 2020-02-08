import { Router } from 'express';

import auth from './auth';
import home from './home';
import news from './news';
import personnel from './personnel';

const router = Router();

router.use(auth);
router.use(home);
router.use(news);
router.use(personnel);

export default router;
