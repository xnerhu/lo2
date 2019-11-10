import { Router } from 'express';
import { escape } from 'mysql';

import db from '~/server/models/db';
import { INews, INewsCategory, INewsFilter, INewsChunk } from '~/interfaces';
import { truncate } from '~/server/utils';

const router = Router();

const getQuery = (filter: INewsFilter = {}, count = false) => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const maxLength = parseInt(process.env.SHORT_NEWS_MAX_LENGTH);

  const { limit, page, text } = filter;

  let category = filter.category as any as string;
  category = category !== '-1' && category;

  let str = 'SELECT ';

  if (!count) str += '* ';
  else str += 'COUNT(*) as count ';
  str += 'FROM news ';

  if (category || text) str += 'WHERE ';
  if (category) str += `_categoryId = ${escape(category)} `;
  if (category && text) str += 'AND ';

  if (text) {
    const escaped = escape(`%${text}%`);
    str += `(content LIKE ${escaped} OR title LIKE ${escaped} ) `;
  }

  const postsLimit = limit || postsPerPage;
  const offset = page ? (page - 1) * postsPerPage : 0;

  str += `ORDER BY _id DESC LIMIT ${escape(postsLimit)} OFFSET ${escape(offset)}`;

  return str;
}

const formatArticle = (data: INews, categories: INewsCategory[]): INews => {
  const maxLength = parseInt(process.env.SHORT_NEWS_MAX_LENGTH);
  const content = truncate(data.content, maxLength);

  return {
    ...data,
    content,
    image: `/static/news/${data.image}`,
    category: categories.find(r => data._categoryId === r._id).title,
  };
}

export const getNews = async (filter?: INewsFilter) => {
  const sql = getQuery(filter);

  const [news, categories] = await Promise.all([
    db.query<INews>({ sql }),
    getNewsCategories()
  ]);

  return news.map(r => formatArticle(r, categories));
}

export const countNewsPages = async (filter?: INewsFilter) => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const sql = getQuery({ ...filter, page: 1 }, true);
  const [item] = await db.query<any>({ sql });

  return Math.ceil(item.count / postsPerPage);
}

export const getNewsChunk = async (filter?: INewsFilter) => {
  const [items, pagesCount] = await Promise.all([getNews(filter), countNewsPages(filter)]);

  const data: INewsChunk = {
    items,
    pagesCount,
    error: pagesCount === 0
  }

  return data;
}

export const getNewsCategories = async () => {
  const data = await db.query<INewsCategory>({
    sql: 'SELECT * FROM `news-categories`',
  });

  return data;
}

export const getNewsData = async (_id: number) => {
  const data = await db.query<INews>({
    sql: 'SELECT * FROM news WHERE _id = ?',
    values: [_id]
  });

  return data[0];
}

router.get('/news', async (req, res) => {
  const data = await getNewsChunk(req.query);

  res.json(data);
});

router.get('/article', async (req, res) => {
  const [data, categories] = await Promise.all([getNewsData(req.query._id), getNewsCategories()]);

  res.json(formatArticle(data, categories));
});

router.get('/news-categories', async (req, res) => {
  const data = await getNewsCategories();

  res.json(data);
});

export default router;
