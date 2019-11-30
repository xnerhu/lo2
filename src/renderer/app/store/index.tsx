import * as React from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';

import { IAppState } from '~/interfaces';
import { AppbarStore } from './appbar';
import { HomeStore } from './home';
import { NewsStore } from './news';
import { ArticleStore } from './article';

class Store {
  public appbar = new AppbarStore();
  public home = new HomeStore();
  public news = new NewsStore();
  public article = new ArticleStore();

  @observable
  public loggedIn = false;

  constructor(state?: IAppState) {
    if (typeof state === 'object') {
      this.home.inject(state);
      this.news.inject(state);
      this.article.inject(state);
    }
  }

  public fetch(path: string) {
    if (path === '/') {
      this.home.load();
    } else if (path.startsWith('/news') && path.length >= 5) {
      this.news.load();
    }
  }
}

export const createStore = (data: any) => () => {
  return new Store(data);
}

const StoreContext = React.createContext<Store>(null)

export const StoreProvider = ({ data, children }: { data?: IAppState, children: any }) => {
  const store = useLocalStore(createStore(data));
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const store = React.useContext(StoreContext);

  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }

  return store
}
