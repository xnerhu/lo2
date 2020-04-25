import { INews } from '~/interfaces';
import { serializeRichText, serializeRichTextToHtml } from './serializer';

const getImage = (data: INews) => {
  return data.hasImage ? `/static/news/${data.id}` : '';
};

export const formatArticle = (data: INews): INews => {
  const { id, label, title, content, createdAt, categoryId, authorId } = data;

  return {
    id,
    label,
    title,
    content,
    createdAt,
    categoryId,
    authorId,
    image: getImage(data),
  };
};

export const formatArticleShort = (data: INews): INews => {
  const maxLength = parseInt(process.env.SHORT_NEWS_MAX_LENGTH);

  const _data = formatArticle(data);
  const json = JSON.parse(data.content);

  return {
    ..._data,
    image: data.hasImage && _data.image + '.thumbnail',
    content: serializeRichText(json, maxLength),
  };
};

export const formatArticleFull = (data: INews): INews => {
  const json = JSON.parse(data.content);

  return {
    ...formatArticle(data),
    content: serializeRichTextToHtml(json),
  };
};
