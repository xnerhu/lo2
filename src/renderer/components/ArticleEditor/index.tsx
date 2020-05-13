import React from 'react';

import {
  IAddArticlePageData,
  IEditArticlePageData,
  IArticleCategory,
} from '~/interfaces';
import { Content } from '../Section';
import { Dropdown, Input } from './style';

interface Props {
  data?: IAddArticlePageData | IEditArticlePageData;
  edit?: boolean;
}

export const ArticleEditor = ({ data, edit }: Props) => {
  const [selectedCategory, selectCategory] = React.useState<string>();

  const titleInput = React.useRef<HTMLInputElement>();

  const onDropdownChange = React.useCallback((item: IArticleCategory) => {
    selectCategory(item._id);
  }, []);

  return (
    <Content>
      <Dropdown
        className="auto"
        placeholder="Kategoria"
        value={selectedCategory}
        items={data?.categories}
        onChange={onDropdownChange}
      />
      <Input ref={titleInput} placeholder="Tytuł" />
    </Content>
  );
};
