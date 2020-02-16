import { Router } from 'express';

import auth from './auth';
import home from './home';
import news from './news';
import personnel from './personnel';
import user from './user';

const router = Router();

router.use(auth);
router.use(home);
router.use(news);
router.use(personnel);
router.use(user);

export default router;
