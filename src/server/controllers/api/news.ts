import { Router } from 'express';

import db from '~/server/models/db';
import { INews } from '~/interfaces';
import { truncate } from '~/server/utils';

const router = Router();
const { POSTS_PER_PAGE, SHORT_NEWS_MAX_LENGTH } = process.env;

export const getNews = async (imgRequired: boolean, limit: string) => {
  const imgSql = imgRequired ? 'WHERE image IS NOT NULL' : '';

  const data = await db.query<INews>({
    sql: `SELECT * FROM news ${imgSql} ORDER BY _id DESC LIMIT ?`,
    values: [parseInt(limit || POSTS_PER_PAGE)]
  });

  return data.map(r => {
    return {
      ...r,
      image: `/static/news/${r.image}`
    }
  });
}

export const getShortNews = async () => {
  const maxLength = parseInt(SHORT_NEWS_MAX_LENGTH);
  const news = await getNews(true, '9');

  return news.map(r => {
    const content = truncate(r.content, maxLength);
    return { ...r, content };
  });
}

router.get('/news', async (req, res) => {
  const { imgRequired, limit } = req.query;
  const data = await getNews(imgRequired, limit);

  res.json(data);
});

router.get('/short-news', async (req, res) => {
  const data = await getShortNews();

  res.json(data);
});

export default router;
