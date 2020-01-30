import * as React from 'react';
import { createEditor } from 'slate';
import { Slate, withReact, useSlate } from 'slate-react';

import { text } from './data';
import { Editable, StyledToolbar } from './style';

interface Props {
  id?: string;
}

const Toolbar = () => {
  const editor = useSlate();

  return <StyledToolbar>xdd</StyledToolbar>;
};

export const RichEditor = () => {
  const editor = React.useMemo(() => withReact(createEditor()), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = React.useState([
    {
      type: 'paragraph',
      children: [{ text }],
    },
  ]);

  return (
    <Slate editor={editor} value={value} onChange={null}>
      <Toolbar />
      <Editable />
    </Slate>
  );
};
