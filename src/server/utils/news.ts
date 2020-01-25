import { INews } from '~/interfaces';
import { truncateString } from './string';

export const formatArticle = (data: INews, truncate = true): INews => {
  const maxLength = parseInt(process.env.SHORT_NEWS_MAX_LENGTH);
  const content = truncate
    ? truncateString(data.content, maxLength)
    : data.content;

  return {
    ...data,
    content,
    image: `/static/news/${data.image}`,
  };
};
