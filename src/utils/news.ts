import { IStringified, INewsFilter } from '~/interfaces';

export const formatNewsFilter = ({
  limit,
  page,
  categoryLabel,
}: IStringified<INewsFilter>) => {
  const filter: INewsFilter = { categoryLabel };

  if (limit) filter.limit = parseInt(limit);
  if (page) filter.page = parseInt(page);

  return filter;
};
