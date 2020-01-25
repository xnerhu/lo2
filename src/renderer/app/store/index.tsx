import * as React from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';

import { IAppState } from '~/interfaces';
import { AppbarStore } from './appbar';
import { HomeStore } from './home';
import { NewsStore } from './news';
import { ArticleStore } from './article';
import { GalleryStore } from './gallery';
import { AlbumStore } from './album';
import { TeachersStore } from './teachers';

class Store {
  public appbar = new AppbarStore();
  public home = new HomeStore();
  public news = new NewsStore();
  public article = new ArticleStore();
  public gallery = new GalleryStore();
  public album = new AlbumStore();
  public teachers = new TeachersStore();

  @observable
  public loggedIn = false;

  constructor(state?: IAppState) {
    if (typeof state === 'object') {
      this.home.inject(state);
      this.news.inject(state);
      this.article.inject(state);
      this.gallery.inject(state);
      this.album.inject(state);
      this.teachers.inject(state);
    }
  }

  public fetch(path: string) {
    if (path === '/') {
      this.home.load();
    } else if (path.startsWith('/gallery')) {
      this.gallery.load();
    } else if (path.startsWith('/teachers')) {
      this.teachers.load();
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
