import { Editor, Transforms, Range } from 'slate';

import { IEditorSelectionFormat, IEditorListFormat } from '~/interfaces';
import { EDITOR_LIST_TYPES } from '~/renderer/constants';

export const isMarkActive = (
  editor: Editor,
  format: IEditorSelectionFormat,
) => {
  const marks = Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: Editor, format: IEditorSelectionFormat) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (
  editor: Editor,
  format: IEditorSelectionFormat,
) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match;
};

export const toggleBlock = (editor: Editor, format: IEditorSelectionFormat) => {
  const isActive = isBlockActive(editor, format);
  const isList = EDITOR_LIST_TYPES.includes(format as IEditorListFormat);

  Transforms.unwrapNodes(editor, {
    match: n => EDITOR_LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  });

  if (!isActive && isList) {
    Transforms.wrapNodes(editor, { type: format, children: [] });
  }
};

export const wrapLink = (editor: Editor, url: string) => {
  if (isBlockActive(editor, 'link')) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, { match: n => n.type === 'link' });
};

export const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

export const insertImage = (editor: Editor, url: string) => {
  const image = { type: 'image', url, children: [{ text: '' }] };

  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, {
    type: 'paragraph',
    children: [{ text: '' }],
  });
};

export const openImageDialog = () => {
  return new Promise(async (resolve: (base64?: string) => void) => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = () => {
      console.log('WTF');
      if (input.files.length === 1) {
        console.log(input.files);
        resolve('xd');
      } else {
        resolve();
      }
    };

    input.onerror = () => {
      resolve();
    };

    input.oncancel = () => {
      console.log('WTFXDWWD');
      resolve();
    };

    input.onblur = () => {
      console.log('aha123');
    };

    input.focus();
    input.click();
  });
};
