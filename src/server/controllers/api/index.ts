import { Router } from 'express';

import article from './article';
import page from './page';

const router = Router();

router.use('/article', article);
router.use('/page', page);

export default router;
