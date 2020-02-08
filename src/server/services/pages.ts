import { promises as fs } from 'fs';
import { resolve } from 'path';

import {
  IHomePagePacket,
  INewsPagePacket,
  INewsFilter,
  IArticlePagePacket,
  IPersonnelPacket,
  IAddArticlePacket,
} from '~/interfaces';
import {
  getNews,
  getNewsChunk,
  getNewsCategories,
  getArticle,
  getProposedNews,
} from './news';
import { listFiles } from '~/server/utils';

export const getHomePagePacket = async (): Promise<IHomePagePacket> => {
  const [sliderItems, news] = await Promise.all([
    listFiles('home-slider'),
    getNews({ limit: 9 }),
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
): Promise<IArticlePagePacket> => {
  const [data, proposed] = await Promise.all([
    getArticle(label),
    getProposedNews(label),
  ]);

  return { data: data || { label }, proposed, error: data == null };
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
