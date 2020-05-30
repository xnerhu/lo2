import { Node } from 'slate';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { serializeToText } from '~/utils/serializer';
import { IArticleEditorErrors } from '../interfaces';
import {
  IInsertArticle,
  IInsertArticleRes,
  IArticle,
  IApiResponse,
} from '~/interfaces';
import { base64toFile } from './file';

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

export const saveArticle = async (
  data: Omit<IInsertArticle, 'authorId'>,
  article?: IArticle,
) => {
  const edit = article != null;

  const form = new FormData();

  form.set('title', data.title);
  form.set('content', data.content);
  form.set('category', data.category);

  if (data.image && (!edit || (edit && article.image !== data.image))) {
    form.append('image', base64toFile(data.image as string));
  }

  if (edit) {
    form.set(
      'deleteImage',
      (article.image != null && data.image == null) as any,
    );
  }

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  let res: AxiosResponse<IInsertArticleRes>;

  try {
    res = await (!edit
      ? axios.post<IInsertArticleRes>(`/api/article`, form, config)
      : axios.patch<IInsertArticleRes>(
          `/api/article/${article.label}`,
          form,
          config,
        ));
    console.log(res);
  } catch (error) {
    console.log(error, res);
  }

  return res?.data;
};

export const deleteArticle = async (label: string) => {
  const res = await axios.delete<IApiResponse>(`/api/article/${label}`);

  return res.data;
};
