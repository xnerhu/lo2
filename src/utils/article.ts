import { IArticleFilter } from '~/interfaces/article';

type IStringified<T> = {
  [P in keyof T]?: string;
};

export const createArticleFilter = ({
  limit,
  page,
  category,
}: IStringified<IArticleFilter>) => {
  const filter: IArticleFilter = {};

  if (category && category !== 'all') {
    filter.category = category;
  }

  if (limit) {
    filter.limit = parseInt(limit as any);
  }

  if (page) {
    filter.page = parseInt(page as any);
  }

  return filter;
};
