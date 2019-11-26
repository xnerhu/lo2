import { IQueryFilter } from 'sql-next';

import { INews, INewsCategory, INewsFilter } from '~/interfaces';
import { truncateString } from './string';

export const formatArticle = (data: INews, categories: INewsCategory[], truncate = true): INews => {
  const maxLength = parseInt(process.env.SHORT_NEWS_MAX_LENGTH);
  const content = truncate ? truncateString(data.content, maxLength) : data.content;

  return {
    ...data,
    content,
    image: `/static/news/${data.image}`,
    category: categories.find(r => data._categoryId === r._id).title,
  };
}

export const getNewsQueryFilter = (filter: INewsFilter) => {
  const { category, text } = filter;
  const item: IQueryFilter<INews> = {}

  if (category) {
    item._categoryId = category;
  }

  if (text && typeof text === 'string') {
    item.content = {
      $text: text
    }
  }

  return item;
}
