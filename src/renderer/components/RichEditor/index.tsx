import * as React from 'react';
import { createEditor, Node, Editor } from 'slate';
import { Slate, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';

import { Toolbar } from './Toolbar';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { Editable } from './style';

const withLinks = (editor: Editor) => {
  const { isInline } = editor;

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  };

  return editor;
};

const withImages = (editor: Editor) => {
  const { isVoid } = editor;

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element);
  };

  return editor;
};

export const RichEditor = () => {
  const editor: Editor & ReactEditor = React.useMemo(
    () => withImages(withLinks(withHistory(withReact(createEditor())))) as any,
    [],
  );

  const renderElement = React.useCallback(props => <Element {...props} />, []);
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, []);

  const [value, setValue] = React.useState<Node[]>(initialValue);
  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Toolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Treść"
      />
    </Slate>
  );
};

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
];
