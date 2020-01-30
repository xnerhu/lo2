import db from '~/server/models/db';
import { INewsFilter, INewsChunk, INewsCategory, INews } from '~/interfaces';
import { IDbNewsPacket } from '../interfaces';
import { formatArticle } from '~/server/utils';
import { formatUser } from '../utils/user';

export const getNewsCategories = async (): Promise<INewsCategory[]> => {
  const query = db.client('news-categories').select('*');

  return await query;
};

export const getNews = async (filter: INewsFilter = {}): Promise<INews[]> => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const { limit, page, categoryLabel, excluded } = filter;
  const offset = page != null ? (page - 1) * postsPerPage : 0;

  let category: INewsCategory;

  let query = db
    .client<INews>('news')
    .orderBy('news.id', 'desc')
    .offset(offset)
    .limit(limit || postsPerPage)
    .options({ nestTables: true });

  if (excluded != null) {
    query = query.whereNot('news.label', excluded);
  }

  if (categoryLabel && categoryLabel !== 'all') {
    const [data]: INewsCategory[] = await db
      .client<INewsCategory>('news-categories')
      .where({ label: categoryLabel })
      .limit(1);

    if (!data) return [];

    category = data;
    query = query.where('news.categoryId', data.id);
  } else {
    query = query.leftJoin('news-categories', {
      'news.categoryId': 'news-categories.id',
    });
  }

  const news: IDbNewsPacket[] = await query.select();

  return news.map(r => {
    return {
      ...formatArticle(r.news),
      _category: category != null ? category : r['news-categories'],
    };
  });
};

export const getNewsChunk = async (
  filter: INewsFilter,
): Promise<INewsChunk> => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const items = await getNews(filter);

  return {
    items,
    nextPage: items.length >= postsPerPage,
  };
};

export const getProposedNews = (excluded: string) => {
  return getNews({ limit: 3, excluded });
};

export const getArticle = async (label: string): Promise<INews> => {
  if (!label) return null;

  const query = db
    .client<INews>('news')
    .where('news.label', label)
    .limit(1)
    .leftJoin('news-categories', {
      'news.categoryId': 'news-categories.id',
    })
    .leftJoin('users', {
      'news.authorId': 'users.id',
    })
    .options({ nestTables: true });

  const [data]: IDbNewsPacket[] = await query.select();

  if (data == null) return null;

  return {
    ...formatArticle(data.news, false),
    _category: data['news-categories'],
    _author: formatUser(data.users),
  };
};
