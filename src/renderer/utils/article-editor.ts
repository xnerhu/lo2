import { Node } from 'slate';

import { serializeToText } from '~/utils/serializer';
import { IArticleEditorErrors } from '../interfaces';

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
