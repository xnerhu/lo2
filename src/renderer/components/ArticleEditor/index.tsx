import React from 'react';
import { Node } from 'slate';

import {
  IAddArticlePageData,
  IEditArticlePageData,
  IArticleCategory,
} from '~/interfaces';
import { defaultRichEditorValue, RichEditor } from '../RichEditor';
import { ImagePick } from './ImagePick';
import { validateInput, saveArticle } from '~/renderer/utils/article-editor';
import { IArticleEditorErrors } from '~/renderer/interfaces';
import { PrimaryButton } from '../Button';
import {
  StyledArticleEditor,
  Toolbar,
  Dropdown,
  Input,
  Divider,
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

  const onFocus = React.useCallback(() => {
    if (errors && errors.success === false) {
      setErrors(null);
    }
  }, [errors]);

  const onSave = React.useCallback(async () => {
    const title = titleInput.current.value.trim();

    const validated = validateInput(title, content);

    if (!validated.success) {
      return setErrors(validated);
    }

    const res = await saveArticle({
      title,
      content: JSON.stringify(content),
      category: selectedCategory ?? data.categories[0].label,
      image: null,
    });

    console.log(res);
  }, [content, data?.categories]);

  return (
    <StyledArticleEditor>
      <Toolbar>
        <Dropdown
          className="auto"
          placeholder="Kategoria"
          value={selectedCategory}
          items={data?.categories}
          onChange={onDropdownChange}
        />
        <PrimaryButton onClick={onSave}>Zapisz</PrimaryButton>
      </Toolbar>
      <Input
        ref={titleInput}
        placeholder="Tytuł"
        error={errors?.title}
        onFocus={onFocus}
      />
      <Divider />
      <RichEditor
        value={content}
        onChange={onContentChange}
        error={errors?.content}
        onFocus={onFocus}
      />
      <ImagePick file={null} />
    </StyledArticleEditor>
  );
};
