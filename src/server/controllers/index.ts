import { Router, static as staticDir } from 'express';
import { join, resolve } from 'path';

import render from './render';
import pages from './pages';
import api from './api';

const router = Router();

router.use('/static', staticDir(join('build/client', 'static')));
router.use('/static', staticDir(resolve('static')));

router.use('/robots.txt', (req, res) => {
  res.redirect('/static/robots.txt');
});

router.use('/api', api);
router.use(pages);
router.use(render);

export default router;
