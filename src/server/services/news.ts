import { resolve } from 'path';

import db from '~/server/models/db';
import {
  INewsFilter,
  INewsChunk,
  INewsCategory,
  INews,
  IEditArticleErrors,
} from '~/interfaces';
import {
  IDbNewsPacket,
  IInsertArticleData,
  IEditArticleData,
} from '../interfaces';
import {
  formatArticle,
  formatLabel,
  saveImage,
  makeId,
  deleteImages,
} from '~/server/utils';
import { formatUser } from '../utils/user';
import { NEWS_IMAGES_PATH } from '../constants';

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
      ...formatArticle(r.news, false),
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
    nextPage: items.length > postsPerPage,
  };
};

export const getProposedNews = (excluded: string) => {
  return getNews({ limit: 3, excluded });
};

export const getHomeNews = () => {
  return getNews({ limit: 9 });
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

  if (!data) return null;

  return {
    ...formatArticle(data.news, true),
    _category: data['news-categories'],
    _author: formatUser(data.users),
  };
};

export const getPlainArtice = async (label: string): Promise<INews> => {
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

  if (!data) return null;

  return {
    ...data.news,
    _category: data['news-categories'],
    _author: formatUser(data.users),
  };
};

export const findCategory = async (label: string): Promise<INewsCategory> => {
  const [item] = await db
    .client<INewsCategory>('news-categories')
    .where({ label })
    .limit(1);

  return item;
};

const getRawArticle = async (label: string) => {
  const res = await db
    .client<INews>('news')
    .where({ label })
    .limit(1);

  return res;
};

export const insertArticle = async (data: IInsertArticleData) => {
  const { title, body, categoryId, authorId, image } = data;
  let label = formatLabel(title);

  const [hasLabel] = await getRawArticle(label);

  if (hasLabel != null) {
    label = `${label}-${makeId(96)}`;
  }

  const [id] = await db.client<INews>('news').insert({
    label,
    title,
    body,
    categoryId,
    authorId,
    hasImage: !!image,
  });

  if (image) {
    const path = resolve(NEWS_IMAGES_PATH, id.toString());

    await saveImage(image.buffer, path);
  }

  return label;
};

export const editArticle = async (
  data: IEditArticleData,
): Promise<IEditArticleErrors | string> => {
  const { label, title, body, categoryId, image, deleteImage } = data;

  if (!label) {
    return { label: 'Nie podano identyfikatora artykułu!' };
  }

  const [item] = await getRawArticle(label);

  if (!item) {
    return { label: 'Artykuł nie istnieje!' };
  }

  await db
    .client<INews>('news')
    .where({ label })
    .limit(1)
    .update({
      title,
      body,
      categoryId,
      hasImage: !deleteImage,
    });

  const imgPath = resolve(NEWS_IMAGES_PATH, item.id.toString());

  if (deleteImage) {
    await deleteImages(imgPath);
  } else if (image) {
    await saveImage(image.buffer, imgPath);
  }

  return label;
};

export const deleteArticle = async (label: string) => {
  if (!label) return new Error('Nie podano identyfikatora artykułu!');

  const [item] = await getRawArticle(label);

  if (!item) {
    return new Error('Artykuł nie istnieje!');
  }

  await db
    .client<INews>('news')
    .where({ label })
    .limit(1)
    .delete();

  const imgPath = resolve(NEWS_IMAGES_PATH, item.id.toString());

  await deleteImages(imgPath);

  return null;
};
