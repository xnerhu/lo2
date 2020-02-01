import * as React from 'react';
import { RenderElementProps } from 'slate-react';

import { IEditorSelectionFormat } from '~/interfaces';

export const Element = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  switch (element.type as IEditorSelectionFormat) {
    case 'align-center':
      return (
        <p className="align-center" {...attributes}>
          {children}
        </p>
      );
    case 'align-right':
      return (
        <p className="align-right" {...attributes}>
          {children}
        </p>
      );
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'list-numbered':
      return <ol {...attributes}>{children}</ol>;
    case 'list-bulleted':
      return <ul {...attributes}>{children}</ul>;
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'h4':
      return <h4 {...attributes}>{children}</h4>;
    case 'link':
      return (
        <a {...attributes} className="article-link" href={element.url}>
          {children}
        </a>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};
