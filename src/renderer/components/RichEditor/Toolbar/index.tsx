import * as React from 'react';
import { Editor, Transforms, Range } from 'slate';
import { useSlate, useSelected, ReactEditor, useEditor } from 'slate-react';

import { icons, EDITOR_LIST_TYPES } from '~/renderer/constants';
import { IEditorSelectionFormat, IEditorListFormat } from '~/interfaces';
import { StyledToolbar, StyledButton, Divider } from './style';

export const isMarkActive = (
  editor: Editor,
  format: IEditorSelectionFormat,
) => {
  const marks = Editor.marks(editor);

  return marks ? marks[format] === true : false;
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

export const toggleMark = (editor: Editor, format: IEditorSelectionFormat) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
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

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, { match: n => n.type === 'link' });
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

export const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const insertImage = (editor: Editor, url: string) => {
  const image = { type: 'image', url, children: [{ text: '' }] };

  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, {
    type: 'paragraph',
    children: [{ text: '' }],
  });
};

interface ButtonProps {
  format: IEditorSelectionFormat;
  block?: boolean;
  icon: string;
  isActive?: (format: string) => boolean;
}

const Button = ({ format, icon, block, isActive }: ButtonProps) => {
  const editor = useSlate();
  let active = false;

  if (isActive) {
    active = isActive(format);
  } else {
    active = block
      ? isBlockActive(editor, format)
      : isMarkActive(editor, format);
  }

  const onClick = React.useCallback(() => {
    if (!block) toggleMark(editor, format);
    else toggleBlock(editor, format);
  }, [format, block]);

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <StyledButton
      onClick={onClick}
      onMouseDown={onMouseDown}
      active={active}
      icon={icon}
    />
  );
};

const LinkButton = () => {
  const editor = useSlate();
  const active = isBlockActive(editor, 'link');

  const onClick = React.useCallback(() => {
    if (!active) {
      const url = window.prompt('Wklej link');
      if (!url) return;
      insertLink(editor, url);
    } else {
      unwrapLink(editor);
    }
  }, [active]);

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <StyledButton
      onClick={onClick}
      onMouseDown={onMouseDown}
      active={active}
      icon={icons.formatLink}
    />
  );
};

const ImageButton = () => {
  const editor = useEditor();

  const onClick = React.useCallback(() => {
    const url = window.prompt('Wklej link do zdjęcia');
    if (!url) return;
    insertImage(editor, url);
  }, []);

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <StyledButton
      onClick={onClick}
      onMouseDown={onMouseDown}
      active={false}
      icon={icons.image}
    />
  );
};

export const Toolbar = () => {
  const editor = useSlate();

  const isAlignLeftActive = React.useCallback(() => {
    return (
      !isBlockActive(editor, 'align-center') &&
      !isBlockActive(editor, 'align-right')
    );
  }, []);

  return (
    <StyledToolbar>
      <Button format="bold" icon={icons.formatBold} />
      <Button format="italic" icon={icons.formatItalic} />
      <Button format="underline" icon={icons.formatUnderline} />
      <Button format="color-highlight" icon={icons.formatColorHighlight} />
      <Divider />
      <LinkButton />
      <Button format="h4" icon={icons.formatHeader4} block />
      <ImageButton />
      <Divider />
      <Button
        format="align-left"
        icon={icons.formatAlignLeft}
        isActive={isAlignLeftActive}
        block
      />
      <Button format="align-center" icon={icons.formatAlignCenter} block />
      <Button format="align-right" icon={icons.formatAlignRight} block />
      <Divider />
      <Button format="code" icon={icons.formatCode} />
      <Button format="block-quote" icon={icons.formatQuote} block />
      <Divider />
      <Button format="list-numbered" icon={icons.listNumbered} block />
      <Button format="list-bulleted" icon={icons.listBulleted} block />
    </StyledToolbar>
  );
};
