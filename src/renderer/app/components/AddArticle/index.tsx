import React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Node } from 'slate';

import { withRouter } from 'react-router-dom';

import {
  defaultRichEditorValue,
  RichEditor,
} from '~/renderer/components/RichEditor';
import {
  IAddArticleRes,
  INewsCategory,
  IAddArticleErrors,
  IEditArticleItem,
  IAddArticlePacket,
} from '~/interfaces';
import { Preloader } from '~/renderer/components/Preloader';
import { useAppState } from '../../store';
import { IRouterProps } from '../../interfaces';
import {
  Content,
  SectionTitle,
  Background,
} from '~/renderer/components/Section';
import { ImagePick } from './PickIMage';
import {
  Input,
  Divider,
  Button,
  StyledUploadScreen,
  ErrorLabel,
  Dropdown,
} from './style';
import { usePage } from '../../utils/hooks';
import { IArticleCategory } from '~/interfaces/article';

const UploadScreen = () => {
  return (
    <StyledUploadScreen>
      <Preloader />
      <SectionTitle>Zapisywanie...</SectionTitle>
    </StyledUploadScreen>
  );
};

interface Props {
  data?: IEditArticleItem;
  edit?: boolean;
}

interface State {
  category?: number;
  categories?: IArticleCategory;
  image?: File | string;
  content?: Node[];
  uploading?: boolean;
  errors?: IAddArticleErrors;
}

export const ArticleEditor = withRouter((props: IRouterProps<Props>) => {
  // const store = useStore();
  const { history, data, edit, match } = props;
  const appState = useAppState();

  if (!appState?.signedIn) {
    React.useEffect(() => {
      history.push('/login');
    }, []);

    return null;
  }

  const [pageData] = usePage<IAddArticlePacket>('addArticle');

  const dropdownItems = pageData?.categories ?? [];

  const [state, setState] = React.useState<State>({
    content: defaultRichEditorValue,
    errors: {},
  });

  const titleInputRef = React.useRef<HTMLInputElement>();
  const fileInputRef = React.createRef<HTMLInputElement>();

  const categories = dropdownItems;

  const selectedCategory =
    state.category; /* || (categories.length && categories[0].id);*/

  const onImageClick = React.useCallback(() => {
    fileInputRef.current.click();
  }, [fileInputRef]);

  const onImageDelete = React.useCallback(() => {
    setState({ ...state, image: null });
  }, [state]);

  const onImageUpload = React.useCallback(() => {
    const image = fileInputRef.current.files[0];
    if (image) {
      setState({ ...state, image, errors: {} });
    }
  }, [state, fileInputRef]);

  const onContentChange = React.useCallback(
    (content: Node[]) => {
      if (state.content !== content) {
        setState({ ...state, content });
      }
    },
    [state],
  );

  const onDropdownChange = React.useCallback(
    (item: INewsCategory) => {
      setState({ ...state, category: item.id });
    },
    [state],
  );

  const onInputFocus = React.useCallback(() => {
    if (Object.keys(state.errors).length > 0) {
      setState({ ...state, errors: {} });
    }
  }, [state]);

  const onSave = async () => {
    const formData = new FormData();
    const title = titleInputRef.current.value;

    let categoryLabel = categories[0].label;

    if (selectedCategory != null) {
      categoryLabel = categories.find((r) => r.id === selectedCategory).label;
    }

    formData.set('title', title.trim());
    formData.set('content', JSON.stringify(state.content));
    formData.set('categoryLabel', categoryLabel);

    if (edit) {
      formData.set('label', match.params.label);

      if (state.image === null) {
        formData.set('deleteImage', true);
      }
    }

    if (state.image) {
      formData.append('image', state.image);
    }

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    setState({ ...state, uploading: true });

    const res = await axios.put<IAddArticleRes>(
      `/api/article/${edit ? 'edit' : 'add'}`,
      formData,
      config,
    );

    if (!res.data.success) {
      setState({ ...state, errors: res.data.errors, uploading: false });
      titleInputRef.current.value = title;
      console.error(res);
    } else {
      window.location.href = `/article/${res.data.articleLabel}`;
    }
  };

  if (edit) {
    React.useEffect(() => {
      if (data && categories) {
        titleInputRef.current.value = data.title;

        setState({
          ...state,
          content: JSON.parse(data.content),
          category: categories.find((r) => r.label === data.categoryLabel)?.id,
          image: data.image,
        });
      }
    }, [data, categories]);

    // React.useEffect(() => {
    //   return () => {
    //     store.editArticle.clear();
    //   };
    // }, []);
  }

  return (
    <>
      {!state.uploading && (
        <Background>
          <Content>
            <Dropdown
              placeholder="Kategoria"
              value={selectedCategory}
              items={categories}
              onChange={onDropdownChange}
            />
            <Input
              ref={titleInputRef}
              placeholder="Tytuł"
              error={!!state.errors.title}
              onFocus={onInputFocus}
            />
            <ErrorLabel error={state.errors.title} />
            <Divider />
            <RichEditor
              value={state.content}
              onChange={onContentChange}
              error={!!state.errors.content}
              onFocus={onInputFocus}
            />
            <ErrorLabel error={state.errors.content} />
            <ImagePick
              file={state.image}
              onClick={onImageClick}
              onDelete={onImageDelete}
            />
            <ErrorLabel error={state.errors.image} />
            <Button onClick={onSave}>Zapisz</Button>
          </Content>
        </Background>
      )}
      {state.uploading && <UploadScreen />}
      <input
        ref={fileInputRef}
        onChange={onImageUpload}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
      />
    </>
  );
});

export default ArticleEditor;
