import React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Node } from 'slate';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';

import { RichEditor } from '~/renderer/components/RichEditor';
import { readFileAsImage } from '../../utils/image';
import { IAddArticleRes, INewsCategory, IAddArticleErrors } from '~/interfaces';
import { Progressbar } from '~/renderer/components/Progressbar';
import { useStore } from '../../store';
import { Dropdown } from '~/renderer/components/Dropdown';
import { IRouterProps } from '../../interfaces';
import {
  Content,
  SectionTitle,
  Background,
} from '~/renderer/components/Section';
import {
  Input,
  Divider,
  StyledImagePick,
  ImageIcon,
  ImagePreview,
  Button,
  StyledUploadScreen,
  ErrorLabel,
} from './style';

interface ImagePickProps {
  file: File;
  onClick: (e: React.MouseEvent) => void;
}

const ImagePick = ({ file, onClick }: ImagePickProps) => {
  const [image, setImage] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      if (file) {
        const data = await readFileAsImage(file);

        setImage(data);
      }
    })();
  }, [file]);

  return (
    <StyledImagePick onClick={onClick}>
      {file ? <ImagePreview src={image} /> : <ImageIcon />}
    </StyledImagePick>
  );
};

const UploadScreen = ({ progress }: { progress: number }) => {
  return (
    <StyledUploadScreen>
      <SectionTitle>Dodawanie...</SectionTitle>
      <Progressbar value={progress} />
    </StyledUploadScreen>
  );
};

export default withRouter(
  observer((props: IRouterProps) => {
    const store = useStore();
    const { history } = props;

    const titleInputRef = React.useRef<HTMLInputElement>();
    const fileInputRef = React.createRef<HTMLInputElement>();

    const [category, setCategory] = React.useState<string>();
    const [image, setImage] = React.useState<File>();
    const [content, setContent] = React.useState<Node[]>(initialValue);

    const [uploading, setUploading] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);

    const [errors, setErrors] = React.useState<IAddArticleErrors>({});

    const categories = React.useMemo(() => store.news.dropdownItems.slice(1), [
      store.news.dropdownItems,
    ]);

    const dropdownValue: string =
      category || (categories.length && categories[0].id);

    const onImageClick = React.useCallback(() => {
      fileInputRef.current.click();
    }, [fileInputRef]);

    const onImageUpload = React.useCallback(() => {
      const file = fileInputRef.current.files[0];
      if (file) setImage(file);
    }, [fileInputRef]);

    const onContentChange = React.useCallback((value: Node[]) => {
      setContent(value);
    }, []);

    const onDropdownChange = React.useCallback((item: INewsCategory) => {
      setCategory(item.id.toString());
    }, []);

    const onSave = async () => {
      const formData = new FormData();

      formData.set('title', titleInputRef.current.value);
      formData.set('content', JSON.stringify(content));
      formData.set('categoryLabel', dropdownValue);

      if (image) {
        formData.append('image', image);
      }

      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e: ProgressEvent) => {
          const rate = e.loaded / e.total;

          setUploadProgress(Math.round(rate * 100));
        },
      };

      setUploading(true);

      const { data } = await axios.put<IAddArticleRes>(
        '/api/add-article',
        formData,
        config,
      );

      setUploading(false);

      if (!data.success) {
        setErrors(data.errors);
      } else {
        history.push(`/article/${data.articleLabel}`);
      }
    };

    React.useEffect(() => {
      store.news.fetchCategories();
    }, []);

    return (
      <>
        {!uploading && (
          <Background>
            <Content>
              <Dropdown
                value={dropdownValue}
                items={categories}
                onChange={onDropdownChange}
              />
              <Input
                ref={titleInputRef}
                placeholder="Tytuł"
                error={!!errors.title}
              />
              <ErrorLabel error={errors.title} />
              <Divider />
              <RichEditor
                value={content}
                onChange={onContentChange}
                error={!!errors.content}
              />
              <ErrorLabel error={errors.content} />
              <ImagePick file={image} onClick={onImageClick} />
              <Button onClick={onSave}>Zapisz</Button>
            </Content>
          </Background>
        )}
        {uploading && <UploadScreen progress={uploadProgress} />}
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

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat, justo quis pretium semper, leo odio lacinia justo, luctus sagittis leo metus et tellus. Nunc dictum, nibh vitae suscipit efficitur, dolor massa maximus elit, ac fringilla arcu magna sit amet dui. Vivamus auctor tristique pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a velit dolor. Praesent et rutrum nisl, sit amet maximus ante. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Pellentesque augue elit, elementum in eleifend vitae, tincidunt quis nunc. Aliquam erat volutpat. Sed tempus in nisi in porttitor. Suspendisse ornare quam sit amet euismod interdum. Fusce lobortis sodales blandit. Nullam sit amet nulla dui. Vivamus malesuada nisi at condimentum consectetur. Phasellus maximus, lacus nec placerat interdum, lorem enim scelerisque diam, at auctor leo ante sed mi.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Fusce fermentum lectus vel maximus bibendum. Sed cursus, diam nec tempus consequat, metus ante venenatis justo, eu vehicula leo eros varius ex. Pellentesque tristique, purus at tristique porttitor, massa nulla aliquam massa, quis suscipit tortor tellus vitae turpis. Vivamus tristique massa ut neque feugiat aliquam. Pellentesque porta arcu aliquam, lobortis dolor sit amet, malesuada eros. Aenean finibus nunc orci, nec vulputate est mollis iaculis. Donec a erat pellentesque, tempus augue id, sollicitudin mauris.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Mauris egestas mi vel lacinia molestie. Duis at tortor id nibh pharetra efficitur sed sit amet lectus. Pellentesque lorem nisi, rhoncus aliquet tellus id, dignissim vulputate metus. Nulla vehicula mi non ex porta, quis tempus odio pharetra. Integer facilisis id dolor id ornare. Aliquam vitae mattis ex. Vestibulum sagittis tincidunt orci id molestie. Mauris rutrum enim lacus. Integer convallis efficitur ante et convallis. Nunc eleifend urna eu ipsum hendrerit, sit amet lacinia lacus blandit.',
      },
    ],
  },
];
