import * as React from 'react';
import { RenderLeafProps } from 'slate-react';

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  let attrs: React.HTMLAttributes<HTMLSpanElement> = {};

  if (leaf.bold) {
    children = <b>{children}</b>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf['color-highlight']) {
    attrs = { className: 'color-highlight' };
  }

  return (
    <span {...attributes} {...attrs}>
      {children}
    </span>
  );
};
