import { INews } from '~/interfaces';
import { serializeRichTextToHtml, serializeRichText } from './serializer';

export const formatArticle = (data: INews, full?: boolean) => {
  const maxLength = parseInt(process.env.SHORT_NEWS_MAX_LENGTH);

  const body = JSON.parse(data.body);

  const content = full
    ? serializeRichTextToHtml(body)
    : serializeRichText(body, maxLength);

  const image = formatArticleImage(data, full);

  return {
    ...data,
    content,
    image,
    body: undefined,
    hasImage: undefined,
  } as INews;
};

export const formatArticleImage = (data: INews, full?: boolean) => {
  return data.hasImage
    ? `/static/news/${data.id}${!full ? '.thumbnail' : ''}`
    : undefined;
};
