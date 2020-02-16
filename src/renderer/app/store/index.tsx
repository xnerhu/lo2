import React from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';

import { IAppState } from '~/interfaces';
import { AppbarStore } from './appbar';
import { HomeStore } from './home';
import { NewsStore } from './news';
import { ArticleStore } from './article';
import { PersonnelStore } from './personnel';
import { AccountStore } from './account';
import { EditArticleStore } from './edit-article';

class Store {
  public appbar = new AppbarStore();
  public home = new HomeStore();
  public news = new NewsStore();
  public article = new ArticleStore();
  public personnel = new PersonnelStore();
  public account = new AccountStore();
  public editArticle = new EditArticleStore();

  @observable
  public test = false;

  constructor(state?: IAppState) {
    if (typeof state === 'object') {
      this.home.inject(state);
      this.news.inject(state);
      this.article.inject(state);
      this.personnel.inject(state);
      this.account.inject(state);
      this.editArticle.inject(state);
    }
  }
}

export const createStore = (data: any) => () => {
  return new Store(data);
};

const StoreContext = React.createContext<Store>(null);

export const StoreProvider = ({
  data,
  children,
}: {
  data?: IAppState;
  children: any;
}) => {
  const store = useLocalStore(createStore(data));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(StoreContext);

  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }

  return store;
};
