import { Node } from 'slate';
import axios, { AxiosRequestConfig } from 'axios';

import { serializeToText } from '~/utils/serializer';
import { IArticleEditorErrors } from '../interfaces';
import { IInsertArticle, IInsertArticleRes } from '~/interfaces';

export const validateInput = (
  title: string,
  content: Node[],
): IArticleEditorErrors => {
  title = title.trim();

  const serialized = serializeToText(content).trim();

  let titleError: string;
  let contentError;

  if (!title.length) titleError = 'Tytuł nie może być pusty!';
  if (!serialized.length) contentError = 'Treść nie może być pusta!';

  return {
    title: titleError,
    content: contentError,
    success: !(titleError || contentError),
  };
};

export const saveArticle = async (data: Omit<IInsertArticle, 'authorId'>) => {
  const formData = new FormData();

  formData.set('title', data.title);
  formData.set('content', data.content);
  formData.set('category', data.category);

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const res = await axios.put<IInsertArticleRes>(
    `/api/article`,
    formData,
    config,
  );

  console.log(res);
};
