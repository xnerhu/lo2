export type IEditorListFormat = 'list-item' | 'list-numbered' | 'list-bulleted';

export type IEditorSelectionFormat =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'code'
  | 'h4'
  | 'block-quote'
  | 'align-left'
  | 'align-center'
  | 'align-right'
  | 'color-highlight'
  | 'link'
  | IEditorListFormat;
