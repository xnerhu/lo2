import React from 'react';
import { Node } from 'slate';

import {
  IAddArticlePageData,
  IEditArticlePageData,
  IArticleCategory,
} from '~/interfaces';
import { defaultRichEditorValue, RichEditor } from '../RichEditor';
import { ImagePick } from './ImagePick';
import { validateInput } from '~/renderer/utils/article-editor';
import { IArticleEditorErrors } from '~/renderer/interfaces';
import {
  StyledArticleEditor,
  Dropdown,
  Input,
  Divider,
  SubmitButton,
} from './style';

interface Props {
  data?: IAddArticlePageData | IEditArticlePageData;
  edit?: boolean;
}

export const ArticleEditor = ({ data, edit }: Props) => {
  const [selectedCategory, selectCategory] = React.useState<string>();
  const [content, setContent] = React.useState<Node[]>(defaultRichEditorValue);
  const [errors, setErrors] = React.useState<IArticleEditorErrors>({});

  const titleInput = React.useRef<HTMLInputElement>();

  const onDropdownChange = React.useCallback((item: IArticleCategory) => {
    selectCategory(item._id);
  }, []);

  const onContentChange = React.useCallback((content: Node[]) => {
    setContent(content);
  }, []);

  const onSave = React.useCallback(() => {
    const validated = validateInput(titleInput.current.value, content);

    if (!validated.success) {
      return setErrors(validated);
    }
  }, [content]);

  return (
    <StyledArticleEditor>
      <Dropdown
        className="auto"
        placeholder="Kategoria"
        value={selectedCategory}
        items={data?.categories}
        onChange={onDropdownChange}
      />
      <Input ref={titleInput} placeholder="Tytuł" error={errors?.title} />
      <Divider />
      <RichEditor
        value={content}
        onChange={onContentChange}
        error={errors?.content}
      />
      <ImagePick file={null} />
      <SubmitButton onClick={onSave}>Zapisz</SubmitButton>
    </StyledArticleEditor>
  );
};
