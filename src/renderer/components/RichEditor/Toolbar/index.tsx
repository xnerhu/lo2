import React from 'react';
import { useSlate, useEditor } from 'slate-react';

import { IEditorSelectionFormat } from '~/interfaces';
import {
  isBlockActive,
  isMarkActive,
  toggleMark,
  toggleBlock,
  insertLink,
  unwrapLink,
  insertImage,
} from '~/renderer/utils/rich-editor';
import { readFileAsImage } from '~/renderer/utils/file';
import {
  ICON_FORMAT_LINK,
  ICON_FORMAT_LINK_OFF,
  ICON_FORMAT_BOLD,
  ICON_FORMAT_CODE,
  ICON_FORMAT_QUOTE,
  ICON_LIST_NUMBERED,
  ICON_FORMAT_ITALIC,
  ICON_FORMAT_UNDERLINE,
  ICON_FORMAT_COLOR_HIGHLIGHT,
  ICON_FORMAT_HEADER_4,
  ICON_FORMAT_ALIGN_LEFT,
  ICON_FORMAT_ALIGN_CENTER,
  ICON_FORMAT_ALIGN_RIGHT,
  ICON_LIST_BULLETED,
  ICON_IMAGE,
} from '~/renderer/constants/icons';
import { StyledToolbar, StyledButton, StyledDivider } from './style';

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
      icon={active ? ICON_FORMAT_LINK_OFF : ICON_FORMAT_LINK}
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
      <StyledButton onClick={onClick} active={false} icon={ICON_IMAGE} />
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
      <Button format="bold" icon={ICON_FORMAT_BOLD} />
      <Button format="italic" icon={ICON_FORMAT_ITALIC} />
      <Button format="underline" icon={ICON_FORMAT_UNDERLINE} />
      <Button format="color-highlight" icon={ICON_FORMAT_COLOR_HIGHLIGHT} />
      <Divider />
      <LinkButton />
      <Button format="h4" icon={ICON_FORMAT_HEADER_4} block />
      {/* <ImageButton /> */}
      <Divider />
      <Button
        format="align-left"
        icon={ICON_FORMAT_ALIGN_LEFT}
        isActive={isAlignLeftActive}
        block
      />
      <Button format="align-center" icon={ICON_FORMAT_ALIGN_CENTER} block />
      <Button format="align-right" icon={ICON_FORMAT_ALIGN_RIGHT} block />
      <Divider />
      <Button format="code" icon={ICON_FORMAT_CODE} />
      <Button format="block-quote" icon={ICON_FORMAT_QUOTE} block />
      <Divider />
      <Button format="list-numbered" icon={ICON_LIST_NUMBERED} block />
      <Button format="list-bulleted" icon={ICON_LIST_BULLETED} block />
    </StyledToolbar>
  );
};
