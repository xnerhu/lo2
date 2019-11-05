import { Router } from 'express';
import { escape } from 'mysql';

import db from '~/server/models/db';
import { INews, INewsCategory, INewsFilter, INewsChunk } from '~/interfaces';
import { truncate } from '~/server/utils';

const { POSTS_PER_PAGE, SHORT_NEWS_MAX_LENGTH } = process.env;

const postsPerPage = parseInt(POSTS_PER_PAGE);
const maxLength = parseInt(SHORT_NEWS_MAX_LENGTH);

const router = Router();

const getQuery = (filter: INewsFilter = {}, count = false) => {
  const { limit, page, category, text } = filter;

  const offset = page ? (page - 1) * postsPerPage : 0;
  const prefix = (category || text) ? 'WHERE ' : '';
  const categorySql = category ? `_categoryId = ${escape(category)}` : '';

  const escapedText = escape(text);
  const textSql = text ? `${category ? 'AND' : ''} (news.content LIKE "%${escapedText}%" OR news.title LIKE "%${escapedText}%")` : '';

  const str = `SELECT ${count ? 'COUNT(*) as count' : '*'} FROM news ${prefix} ${categorySql} ${textSql} ORDER BY _id DESC LIMIT ${escape(limit || postsPerPage)} OFFSET ${offset}`;

  return str;
}

export const getNews = async (filter?: INewsFilter) => {
  const sql = getQuery(filter);

  const [news, categories] = await Promise.all([
    db.query<INews>({ sql }),
    getNewsCategories()
  ]);

  return news.map(r => {
    const content = truncate(r.content, maxLength);

    return {
      ...r,
      content,
      image: `/static/news/${r.image}`,
      category: categories.find(x => r._categoryId === x._id).title,
    } as INews
  });
}

export const countNewsPages = async (filter?: INewsFilter) => {
  const sql = getQuery({ ...filter, page: 1 }, true);
  const [item] = await db.query<any>({ sql });

  return Math.ceil(item.count / postsPerPage);
}

export const getNewsCategories = async () => {
  const data = await db.query<INewsCategory>({
    sql: 'SELECT * FROM `news-categories`',
  });

  return data;
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

router.get('/news', async (req, res) => {
  const data = await getNewsChunk(req.query);

  res.json(data);
});

router.get('/news-categories', async (req, res) => {
  const data = await getNewsCategories();

  res.json(data);
});

export default router;
