import { promises as fs } from 'fs';
import { Router } from 'express';
import { resolve } from 'path';

import { ITeachersSection } from '~/interfaces';

const path = resolve('static', 'teachers.json');

const router = Router();

export const getTeachers = async (): Promise<ITeachersSection[]> => {
  const data = await fs.readFile(path, 'utf8');

  return JSON.parse(data);
}

router.get('/teachers', async (res, req) => {
  const data = await getTeachers();

  req.send(JSON.stringify(data));
});

export default router;
