import { Router } from 'express';
import { promises as fs } from 'fs';
import { resolve, parse } from 'path';

const router = Router();

export const getSliderItems = async () => {
  const path = resolve('./static', 'slider');
  const files = await fs.readdir(path);

  return files.map(r => {
    const { name, ext } = parse(r);

    if (ext === '.webp') return null;
    return `/static/slider/${name}`;
  }).filter(r => r);
}

router.get('/slider', async (req, res) => {
  const data = await getSliderItems();

  res.json(data);
});

export default router;
