import { promises as fs } from 'fs';
import { resolve } from 'path';

import {
  IHomePagePacket,
  INewsPagePacket,
  INewsFilter,
  IArticlePagePacket,
  IPersonnelPacket,
  IAddArticlePacket,
  IUser,
  INews,
  IEditArticlePacket,
} from '~/interfaces';
import {
  getNewsChunk,
  getNewsCategories,
  getArticle,
  getProposedNews,
  getPlainArtice,
} from './news';
import { listFiles, formatArticleImage } from '~/server/utils';
import db from '../models/db';

export const getHomePagePacket = async (): Promise<IHomePagePacket> => {
  const [sliderItems, news] = await Promise.all([
    listFiles('home-slider'),
    db.home.newsCache.data(),
  ]);

  return {
    sliderItems,
    news,
  };
};

export const getNewsPagePacket = async (
  filter: INewsFilter,
): Promise<INewsPagePacket> => {
  const [news, categories] = await Promise.all([
    getNewsChunk(filter),
    getNewsCategories(),
  ]);

  return { news, categories };
};

export const getArticlePagePacket = async (
  label: string,
  user: IUser,
): Promise<IArticlePagePacket> => {
  const [data, proposed] = await Promise.all([
    getArticle(label),
    getProposedNews(label),
  ]);

  const _data = data || { label };

  return {
    data: _data,
    proposed,
    error: data == null,
    editable: isArticleEditable(_data, user),
  };
};

export const getPersonnelPacket = async (): Promise<IPersonnelPacket> => {
  const [sliderItems, sections] = await Promise.all([
    listFiles('personnel-slider'),
    fs.readFile(resolve('static', 'personnel.json')),
  ]);

  return { sliderItems, sections: JSON.parse(sections as any) };
};

export const getAddArticlePacket = async (): Promise<IAddArticlePacket> => {
  const categories = await getNewsCategories();

  return { categories };
};

export const getEditArticlePacket = async (
  label: string,
  user: IUser,
): Promise<IEditArticlePacket> => {
  const [categories, article] = await Promise.all([
    getNewsCategories(),
    getPlainArtice(label),
  ]);

  const editable = isArticleEditable(article, user);
  let error = '';

  if (!article) {
    error = 'Nie znaleziono artykułu!';
  } else if (!editable) {
    error = 'Nie masz uprawnień, aby móc edytować ten artykuł!';
  }

  return {
    label,
    categories: editable && categories,
    item: editable && {
      title: article.title,
      categoryLabel: article._category.label,
      content: article.body,
      image: formatArticleImage(article),
    },
    success: editable,
    error,
  };
};

const isArticleEditable = (article: INews, user: IUser) => {
  if (!article) return false;
  if (!user) return false;
  if (user.admin) return true;

  return user.id === article.authorId;
};
