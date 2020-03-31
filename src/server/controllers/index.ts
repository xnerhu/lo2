import { Router, static as staticDir } from 'express';

import { BUILD_PATH, STATIC_PATH } from '../constants';
import api from './api';
import page from './page';
import render from './render';
import { useAuth } from '../middleware/auth';

const router = Router();

router.use('/static', staticDir(BUILD_PATH));
router.use('/static', staticDir(STATIC_PATH));

router.use('/robots.txt', (req, res) => {
  res.redirect('/static/robots.txt');
});

router.get('*', useAuth);

router.use('/api', api);
router.use(page);
router.use(render);

export default router;
