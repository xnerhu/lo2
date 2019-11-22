import { Router } from 'express';

import { IRequest } from '../../interfaces';
import { getTeachers } from '../api/teachers';

const router = Router();

router.get('/about/teachers', async (req: IRequest, res, next) => {
  const teachers = await getTeachers();

  req.appState = { teachers };

  next();
});

export default router;
