import { Node } from 'slate';

import { truncateString } from './string';

export const serializeToText = (nodes: Node[], limit?: number): string => {
  let text = '';

  nodes.some((r) => {
    text += Node.string(r) + ' ';

    if (limit != null && text.length >= limit) {
      text = truncateString(text.trim(), limit);

      return true;
    }

    return false;
  });

  return text;
};
