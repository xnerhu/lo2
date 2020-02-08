import { Router, static as staticDir } from 'express';

import { BUILD_PATH, STATIC_PATH } from '../constants';
import render from './render';
import pages from './pages';
import api from './api';

const router = Router();

router.use('/static', staticDir(BUILD_PATH));
router.use('/static', staticDir(STATIC_PATH));

router.use('/robots.txt', (req, res) => {
  res.redirect('/static/robots.txt');
});

router.use('/api', api);
router.use(pages);
router.use(render);

export default router;
