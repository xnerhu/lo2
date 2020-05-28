import React from 'react';
import { Node } from 'slate';

import { ImageEditor } from './ImageEditor';
import {
  IAddArticlePageData,
  IEditArticlePageData,
  IArticleCategory,
} from '~/interfaces';
import { defaultRichEditorValue, RichEditor } from '../RichEditor';
import { validateInput, saveArticle } from '~/renderer/utils/article-editor';
import { IArticleEditorErrors } from '~/renderer/interfaces';
import { PrimaryButton } from '../Button';
import { readFileAsImage } from '~/renderer/utils/image';
import { resetFileInput } from '~/renderer/utils/dom';
import { ImageButton } from './ImageButton';
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
  const [image, setImage] = React.useState<string>();

  const titleInput = React.useRef<HTMLInputElement>();
  const imgInput = React.useRef<HTMLInputElement>();
  const imageEditor = React.useRef<ImageEditor>();

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

  const onImageButtonClick = React.useCallback(() => {
    imgInput.current.click();
  }, []);

  const onImageButtonDelete = React.useCallback(() => {
    setImage(null);
  }, []);

  const onImageSelect = React.useCallback(() => {
    const file = imgInput.current.files[0];

    if (!file) return null;

    let canceled = false;

    (async () => {
      const base64 = await readFileAsImage(file);
      const edited = await imageEditor.current.process(base64);

      if (edited && !canceled) {
        setImage(edited);
      }

      resetFileInput(imgInput.current);
    })();

    return () => (canceled = true);
  }, []);

  return (
    <>
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
        <ImageButton
          src={image}
          onClick={onImageButtonClick}
          onDelete={onImageButtonDelete}
        />
        <ImageEditor ref={imageEditor} />
      </StyledArticleEditor>
      <input
        ref={imgInput}
        onChange={onImageSelect}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
      />
    </>
  );
};
