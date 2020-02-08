import React from 'react';
import { createEditor, Node, Editor } from 'slate';
import { Slate, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';

import { Toolbar } from './Toolbar';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { Container, Editable } from './style';

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

const createRichEditor = (): Editor & ReactEditor => {
  return React.useMemo(
    () => withImages(withLinks(withHistory(withReact(createEditor())))) as any,
    [],
  );
};

interface Props {
  value?: Node[];
  onChange?: (value: Node[]) => void;
  error?: boolean;
  style?: React.CSSProperties;
}

export const RichEditor = ({ value, onChange, error, style }: Props) => {
  const editor = createRichEditor();

  const renderElement = React.useCallback(props => <Element {...props} />, []);
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, []);

  return (
    <Container error={error} style={style}>
      <Slate editor={editor} value={value || defaultValue} onChange={onChange}>
        <Toolbar />
        <Editable
          className="rich-editor-editable"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Treść"
        />
      </Slate>
    </Container>
  );
};

const defaultValue: Node[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];
