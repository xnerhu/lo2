import { INews } from '~/interfaces';
import { serializeRichTextToHtml, serializeRichText } from './serializer';

export const formatArticle = (data: INews, full = false) => {
  const maxLength = parseInt(process.env.SHORT_NEWS_MAX_LENGTH);

  const body = JSON.parse(data.body);

  const content = full
    ? serializeRichTextToHtml(body)
    : serializeRichText(body, maxLength);

  const image =
    data.hasImage && `/static/news/${data.id}${!full ? '.thumbnail' : ''}`;

  return {
    ...data,
    content,
    image,
    body: undefined,
    hasImage: undefined,
  } as INews;
};
