import React from 'react';
import { useSlate, useEditor } from 'slate-react';

import { icons } from '~/renderer/constants';
import { IEditorSelectionFormat } from '~/interfaces';
import {
  isBlockActive,
  isMarkActive,
  toggleMark,
  toggleBlock,
  insertLink,
  unwrapLink,
  insertImage,
} from '~/renderer/app/utils/rich-editor';
import { StyledToolbar, StyledButton, StyledDivider } from './style';
import { readFileAsImage } from '~/renderer/app/utils/image';

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

  return <StyledButton onClick={onClick} active={active} icon={icon} />;
};

const LinkButton = () => {
  const editor = useSlate();
  const active = isBlockActive(editor, 'link');

  const onClick = React.useCallback(() => {
    if (!active) {
      let url = window.prompt('Wklej link');
      if (!url) return;

      if (!url.startsWith('http')) {
        url = `http://${url}`;
      }

      insertLink(editor, url);
    } else {
      unwrapLink(editor);
    }
  }, [active]);

  return (
    <StyledButton
      onClick={onClick}
      active={active}
      icon={active ? icons.formatLinkOff : icons.formatLink}
    />
  );
};

const ImageButton = () => {
  const fileInputRef = React.useRef<HTMLInputElement>();
  const editor = useEditor();

  const onClick = React.useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const onImageUpload = React.useCallback(() => {
    (async () => {
      const files = fileInputRef.current.files;

      if (files.length === 1) {
        const base64 = await readFileAsImage(files[0]);

        insertImage(editor, base64);
      }
    })();
  }, []);

  return (
    <>
      <StyledButton onClick={onClick} active={false} icon={icons.image} />
      <input
        ref={fileInputRef}
        onChange={onImageUpload}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
      />
    </>
  );
};

const Divider = () => {
  return <StyledDivider className="rich-editor-divider" />;
};

export const Toolbar = () => {
  const editor = useSlate();

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  const isAlignLeftActive = React.useCallback(() => {
    return (
      !isBlockActive(editor, 'align-center') &&
      !isBlockActive(editor, 'align-right')
    );
  }, []);

  return (
    <StyledToolbar onMouseDown={onMouseDown}>
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
