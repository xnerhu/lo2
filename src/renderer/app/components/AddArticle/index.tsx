import React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Node } from 'slate';
import { observer } from 'mobx-react-lite';
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
} from '~/interfaces';
import { Preloader } from '~/renderer/components/Preloader';
import { useStore } from '../../store';
import { Dropdown } from '~/renderer/components/Dropdown';
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
} from './style';

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
  category?: string;
  image?: File | string;
  content?: Node[];
  uploading?: boolean;
  errors?: IAddArticleErrors;
}

export const ArticleEditor = withRouter(
  observer((props: IRouterProps<Props>) => {
    const store = useStore();
    const { history, data, edit, match } = props;

    if (!store.account.isLogged) {
      React.useEffect(() => {
        history.push('/login');
      }, []);

      return null;
    }

    const dropdownItems = store.news.dropdownItems;

    const [state, setState] = React.useState<State>({
      content: defaultRichEditorValue,
      errors: {},
    });

    const titleInputRef = React.useRef<HTMLInputElement>();
    const fileInputRef = React.createRef<HTMLInputElement>();

    const categories = React.useMemo(() => dropdownItems.slice(1), [
      dropdownItems,
    ]);

    const selectedCategory =
      state.category || (categories.length && categories[0].id);

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
        setState({ ...state, category: item.id.toString() });
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

      formData.set('title', title.trim());
      formData.set('content', JSON.stringify(state.content));
      formData.set('categoryLabel', selectedCategory);

      if (edit) {
        formData.set('label', match.params.label);

        if (state.image === null) {
          formData.set('deleteImage', 'true');
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
        `/api/${edit ? 'edit' : 'add'}-article`,
        formData,
        config,
      );

      if (!res.data.success) {
        setState({ ...state, errors: res.data.errors, uploading: false });
        titleInputRef.current.value = title;
        console.error(res);
      } else {
        history.push(`/article/${res.data.articleLabel}`);
      }
    };

    React.useEffect(() => {
      store.news.fetchCategories();
    }, []);

    if (edit) {
      React.useEffect(() => {
        if (data) {
          titleInputRef.current.value = data.title;

          setState({
            ...state,
            content: JSON.parse(data.content),
            category: data.categoryLabel,
            image: data.image,
          });
        }
      }, [data]);

      React.useEffect(() => {
        return () => {
          store.editArticle.clear();
        };
      }, []);
    }

    return (
      <>
        {!state.uploading && (
          <Background>
            <Content>
              <Dropdown
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
  }),
);

export default ArticleEditor;
