import { INews } from '~/interfaces';

export const formatArticleDate = (data: INews) => {
  const { createdAt } = data;
  const date = new Date(createdAt);

  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
