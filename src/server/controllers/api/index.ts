import { Router } from 'express';

import article from './article';
import page from './page';
import auth from './auth';

const router = Router();

router.use('/article', article);
router.use('/page', page);
router.use('/auth', auth);

export default router;
