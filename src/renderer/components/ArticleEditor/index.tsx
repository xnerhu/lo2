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
import { readFileAsImage } from '~/renderer/utils/file';
import { resetFileInput } from '~/renderer/utils/dom';
import { ImageButton } from './ImageButton';
import { splitArticleCategories } from '~/renderer/utils/article';
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
  const articleData = edit && (data as IEditArticlePageData)?.article;

  const { categories, subcategories } = React.useMemo(
    () => splitArticleCategories(data?.categories) || {},
    [data?.categories],
  );

  const [selectedCategory, selectCategory] = React.useState<string>();
  const [selectedSubcategory, selectSubcategory] = React.useState<string>();

  const [content, setContent] = React.useState<Node[]>(defaultRichEditorValue);
  const [image, setImage] = React.useState<string>();

  const [errors, setErrors] = React.useState<IArticleEditorErrors>({});

  const availableSubcategories = React.useMemo(
    () =>
      selectedCategory
        ? subcategories.filter(
            (r) => r.subcategoryRef.toString() === selectedCategory,
          )
        : [],
    [selectedCategory, subcategories],
  );

  const titleInput = React.useRef<HTMLInputElement>();
  const imgInput = React.useRef<HTMLInputElement>();
  const imageEditor = React.useRef<ImageEditor>();

  const onCategoryChange = React.useCallback((item: IArticleCategory) => {
    selectCategory(item._id);
  }, []);

  const onSubCategoryChange = React.useCallback((item: IArticleCategory) => {
    selectSubcategory(item._id);
  }, []);

  const onContentChange = React.useCallback((content: Node[]) => {
    setContent(content);
  }, []);

  const onFocus = React.useCallback(() => {
    if (errors && errors.success === false) {
      setErrors(null);
    }
  }, [errors]);

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

  const onSave = React.useCallback(async () => {
    const title = titleInput.current.value.trim();

    const validated = validateInput(title, content);

    if (!validated.success) {
      return setErrors(validated);
    }

    const res = await saveArticle(
      {
        title,
        content: JSON.stringify(content),
        category: !selectedCategory
          ? data.categories[0].label
          : categories.find((r) => r._id.toString() === selectedCategory).label,
        subcategory:
          availableSubcategories.length &&
          availableSubcategories.find(
            (r) => r._id.toString() === selectedSubcategory,
          )?.label,
        image,
      },
      articleData,
    );

    if (res?.success) {
      window.location.href = `/artykuł/${res.label}`;
    }
  }, [
    content,
    data,
    image,
    edit,
    categories,
    selectedCategory,
    selectedSubcategory,
    availableSubcategories,
  ]);

  React.useEffect(() => {
    if (!data) return;

    const { success } = data as IEditArticlePageData;

    if (success) {
      const { title, categoryId, subcategoryId, content, image } = articleData;

      titleInput.current.value = title;

      selectCategory(categoryId);

      if (subcategoryId) {
        selectSubcategory(subcategoryId);
      }

      setImage(image);
      setContent(JSON.parse(content));
    }
  }, [data]);

  return (
    <>
      <StyledArticleEditor>
        <Toolbar>
          <Dropdown
            className="auto"
            placeholder="Kategoria"
            value={selectedCategory}
            items={categories}
            onChange={onCategoryChange}
          />
          {availableSubcategories.length != 0 && (
            <Dropdown
              className="auto"
              placeholder="Podkategoria"
              value={selectedSubcategory}
              items={availableSubcategories}
              onChange={onSubCategoryChange}
            />
          )}
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
