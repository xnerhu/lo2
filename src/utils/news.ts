import { IStr, INewsFilter } from '~/interfaces'

export const formatNewsFilter = (data: IStr<INewsFilter>) => {
  const { category, limit, page, text } = data;
  const filter: INewsFilter = {};

  if (category && category !== '-1') filter.category = parseInt(category);
  if (limit) filter.limit = parseInt(limit);
  if (page) filter.page = parseInt(page);
  if (text) filter.text = text;

  return filter;
}
