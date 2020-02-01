import * as React from 'react';
import { RenderElementProps, useFocused, useSelected } from 'slate-react';

import { IEditorSelectionFormat } from '~/interfaces';
import { PRIMARY_COLOR } from '~/renderer/constants';

export const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;

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
    case 'image':
      return <ImageElement {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const ImageElement = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const selected = useSelected();
  const focused = useFocused();

  const style: React.CSSProperties = {
    boxShadow: selected && focused ? `${PRIMARY_COLOR} 0px 0px 0px 2px` : '',
  };

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img className="article-image" src={element.url} style={style} />
      </div>
      {children}
    </div>
  );
};
