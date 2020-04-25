import { INews } from '~/interfaces';
import { serializeRichText, serializeRichTextToHtml } from './serializer';

const getImage = (data: INews) => {
  return data.hasImage ? `/static/news/${data.id}` : '';
};

export interface IArticleFormat {
  image?: 'thumbnail' | 'full';
  content?: 'text' | 'html';
  maxLength?: number;
}

export const formatArticle = (data: INews, format?: IArticleFormat): INews => {
  const { id, label, title, createdAt, categoryId, authorId } = data;

  let content = data.content;
  const json = JSON.parse(content);

  if (format?.content === 'html') {
    content = serializeRichTextToHtml(json);
  } else {
    content = serializeRichText(json, format?.maxLength);
  }

  let image = getImage(data);

  if (image && format?.image === 'thumbnail') {
    image = image + '.thumbnail';
  }

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
