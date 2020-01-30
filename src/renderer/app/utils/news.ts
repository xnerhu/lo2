import { INewsFilter } from '~/interfaces';

export const stringifyNewsFilter = (filter: INewsFilter) => {
  return `/news/${filter.categoryLabel}${filter.page ? `/${filter.page}` : ''}`;
};
