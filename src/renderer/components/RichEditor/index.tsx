import React from 'react';
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

  const [value, setValue] = React.useState<Node[]>(initialValue);

  const renderElement = React.useCallback(props => <Element {...props} />, []);
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, []);

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
      {
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat, justo quis pretium semper, leo odio lacinia justo, luctus sagittis leo metus et tellus. Nunc dictum, nibh vitae suscipit efficitur, dolor massa maximus elit, ac fringilla arcu magna sit amet dui. Vivamus auctor tristique pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a velit dolor. Praesent et rutrum nisl, sit amet maximus ante. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Pellentesque augue elit, elementum in eleifend vitae, tincidunt quis nunc. Aliquam erat volutpat. Sed tempus in nisi in porttitor. Suspendisse ornare quam sit amet euismod interdum. Fusce lobortis sodales blandit. Nullam sit amet nulla dui. Vivamus malesuada nisi at condimentum consectetur. Phasellus maximus, lacus nec placerat interdum, lorem enim scelerisque diam, at auctor leo ante sed mi.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Fusce fermentum lectus vel maximus bibendum. Sed cursus, diam nec tempus consequat, metus ante venenatis justo, eu vehicula leo eros varius ex. Pellentesque tristique, purus at tristique porttitor, massa nulla aliquam massa, quis suscipit tortor tellus vitae turpis. Vivamus tristique massa ut neque feugiat aliquam. Pellentesque porta arcu aliquam, lobortis dolor sit amet, malesuada eros. Aenean finibus nunc orci, nec vulputate est mollis iaculis. Donec a erat pellentesque, tempus augue id, sollicitudin mauris.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Mauris egestas mi vel lacinia molestie. Duis at tortor id nibh pharetra efficitur sed sit amet lectus. Pellentesque lorem nisi, rhoncus aliquet tellus id, dignissim vulputate metus. Nulla vehicula mi non ex porta, quis tempus odio pharetra. Integer facilisis id dolor id ornare. Aliquam vitae mattis ex. Vestibulum sagittis tincidunt orci id molestie. Mauris rutrum enim lacus. Integer convallis efficitur ante et convallis. Nunc eleifend urna eu ipsum hendrerit, sit amet lacinia lacus blandit.',
      },
    ],
  },
];
