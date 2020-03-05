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
} from '~/renderer/app/utils/rich-editor';
import { readFileAsImage } from '~/renderer/app/utils/image';
import {
  FORMAT_LINK_ICON,
  FORMAT_LINK_OFF_ICON,
  FORMAT_BOLD_ICON,
  FORMAT_CODE_ICON,
  FORMAT_QUOTE_ICON,
  LIST_NUMBERED_ICON,
  FORMAT_ITALIC_ICON,
  FORMAT_UNDERLINE_ICON,
  FORMAT_COLOR_HIGHLIGHT_ICON,
  FORMAT_HEADER_4_ICON,
  FORMAT_ALIGN_LEFT_ICON,
  FORMAT_ALIGN_CENTER_ICON,
  FORMAT_ALIGN_RIGHT_ICON,
  LIST_BULLETED_ICON,
  IMAGE_ICON,
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
      icon={active ? FORMAT_LINK_OFF_ICON : FORMAT_LINK_ICON}
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
      <StyledButton onClick={onClick} active={false} icon={IMAGE_ICON} />
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
      <Button format="bold" icon={FORMAT_BOLD_ICON} />
      <Button format="italic" icon={FORMAT_ITALIC_ICON} />
      <Button format="underline" icon={FORMAT_UNDERLINE_ICON} />
      <Button format="color-highlight" icon={FORMAT_COLOR_HIGHLIGHT_ICON} />
      <Divider />
      <LinkButton />
      <Button format="h4" icon={FORMAT_HEADER_4_ICON} block />
      <ImageButton />
      <Divider />
      <Button
        format="align-left"
        icon={FORMAT_ALIGN_LEFT_ICON}
        isActive={isAlignLeftActive}
        block
      />
      <Button format="align-center" icon={FORMAT_ALIGN_CENTER_ICON} block />
      <Button format="align-right" icon={FORMAT_ALIGN_RIGHT_ICON} block />
      <Divider />
      <Button format="code" icon={FORMAT_CODE_ICON} />
      <Button format="block-quote" icon={FORMAT_QUOTE_ICON} block />
      <Divider />
      <Button format="list-numbered" icon={LIST_NUMBERED_ICON} block />
      <Button format="list-bulleted" icon={LIST_BULLETED_ICON} block />
    </StyledToolbar>
  );
};
