import * as React from 'react';
import { Range, Editor } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';

import { isBlockActive, insertLink } from '../Toolbar';
import { Input } from '../../Input';
import { StyledDialog, Title, ApplyButton, Container } from './style';

interface Props {
  visible: boolean;
}

export const LinkDialog = ({ visible }: Props) => {
  const editor = useSlate();
  const ref = React.useRef<HTMLDivElement>();
  const inputRef = React.useRef<HTMLInputElement>();
  const inputFocused = React.useRef(false);

  React.useEffect(() => {
    const { current } = ref;
    if (!current || inputFocused.current) return;

    const { selection } = editor;

    const isActive = isBlockActive(editor, 'link');

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      current.removeAttribute('style');
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    current.style.top = `${rect.top +
      window.pageYOffset -
      current.offsetHeight +
      current.offsetHeight +
      rect.height}px`;

    current.style.left = `${rect.left +
      window.pageXOffset -
      current.offsetWidth / 2 +
      rect.width / 2}px`;
  });

  const onInputFocus = React.useCallback(() => {
    inputFocused.current = true;
  }, []);

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  const onApply = React.useCallback(() => {
    const url = inputRef.current.value;

    if (url) {
      insertLink(editor, url);
    }
  }, []);

  return (
    <StyledDialog ref={ref} visible={visible}>
      <Title>Dodaj link</Title>
      <Container>
        <Input
          ref={inputRef}
          placeholder="Wklej link"
          onFocus={onInputFocus}
          spellCheck={false}
        />
        <ApplyButton onMouseDown={onMouseDown} onClick={onApply}>
          Zastostuj
        </ApplyButton>
      </Container>
    </StyledDialog>
  );
};
