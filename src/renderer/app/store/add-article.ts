import React from 'react';
import { observable, computed, action } from 'mobx';
import { Node } from 'slate';

import { useStore } from './';
import { INewsCategory } from '~/interfaces';

export class AddArticleStore {
  @observable
  protected _selectedCategory: string;

  @observable
  public image: File;

  @observable
  public content: Node[] = defaultRichEditorValue;

  public titleInput = React.createRef<HTMLInputElement>();

  public fileInput = React.createRef<HTMLInputElement>();

  @computed
  public get categories() {
    const store = useStore();
    return store.news.dropdownItems.slice(1);
  }

  @computed
  public get selectedCategory() {
    return (
      this._selectedCategory ||
      (this.categories.length && this.categories[0].id)
    );
  }

  public onImageClick = () => {
    this.fileInput.current.click();
  };

  @action
  public onContentChange = (value: Node[]) => {
    this.content = value;
  };

  @action
  public onDropdownChange = (item: INewsCategory) => {
    this._selectedCategory = item.id.toString();
  };
}

const defaultRichEditorValue: Node[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];
