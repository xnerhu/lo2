import { INews } from '~/interfaces';
import { serializeRichTextToHtml, serializeRichText } from './serializer';

export const formatArticle = (data: INews, full = false): INews => {
  const maxLength = parseInt(process.env.SHORT_NEWS_MAX_LENGTH);

  const body = JSON.parse(data.body);

  const content = full
    ? serializeRichTextToHtml(body)
    : serializeRichText(body, maxLength);

  return {
    ...data,
    content,
    image: `/static/news/${data.image}`,
  };
};
