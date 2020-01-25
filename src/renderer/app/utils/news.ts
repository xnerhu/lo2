import { INews, INewsFilter } from '~/interfaces';
import { SHORT_MONTHS } from '~/renderer/constants';

export const formatArticleDate = (data: INews) => {
  const { createdAt } = data;
  const date = new Date(createdAt);

  const month = SHORT_MONTHS[date.getMonth()];

  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};

export const stringifyNewsFilter = (filter: INewsFilter) => {
  return `/news/${filter.categoryLabel}${filter.page ? `/${filter.page}` : ''}`;
};
