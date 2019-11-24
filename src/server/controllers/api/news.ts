import { Router } from 'express';

import db from '~/server/models/db';
import { INewsFilter, INewsChunk } from '~/interfaces';
import { formatArticle, getNewsQueryFilter } from '~/server/utils';
import { formatNewsFilter } from '~/utils';

const router = Router();

export const getNewsCategories = () => {
  return db.newsCategories.find();
}

export const getNews = async (filter?: INewsFilter) => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const { limit, page } = filter;
  const offset = page ? ((page - 1) * postsPerPage) : 0;

  const query = getNewsQueryFilter(filter);
  const news = await db.news.find(query, {
    limit: limit || postsPerPage,
    offset,
    sort: {
      _id: false,
    },
  });

  const categories = await getNewsCategories();

  return news.map(r => formatArticle(r, categories));
}

export const countNewsPages = async (filter?: INewsFilter) => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const query = getNewsQueryFilter(filter);
  const count = await db.news.count(query);

  return Math.ceil(count / postsPerPage);
}

export const getNewsChunk = async (filter?: INewsFilter): Promise<INewsChunk> => {
  const [items, pagesCount] = await Promise.all([getNews(filter), countNewsPages(filter)]);

  return { items, pagesCount };
}

export const handleNewsRequest = async (query: any) => {
  const filter = formatNewsFilter(query);
  const data = await getNewsChunk(filter);

  return data;
}

router.get('/news', async (req, res) => {
  const data = await handleNewsRequest(req.query);

  res.json(data);
});

router.get('/news-categories', async (req, res) => {
  const data = await getNewsCategories();

  res.json(data);
});

export default router;
