import * as React from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';

import { IAppState, INews, IGallerySection } from '~/interfaces';
import { HomeStore } from './home';


import { NewsStore } from './news';
import { ArticleStore } from './article';
import { MenuStore } from './menu';
import { PressStore } from './press';
import { StoreBase } from '../models';

class Store {
  public home = new HomeStore();





  public news = new NewsStore();
  public article = new ArticleStore();

  public teachers = new StoreBase<INews>({
    api: 'teachers',
    name: 'teachers',
    path: '/about/teachers',
  });

  public gallery = new StoreBase<IGallerySection>({
    api: 'gallery',
    name: 'gallery',
    path: '/gallery',
  });

  public menu = new MenuStore();
  public press = new PressStore();

  @observable
  public loggedIn = false;

  constructor(state?: IAppState) {
    if (state) {
      this.home.inject(state);

      // const stores = this.getStores();

      // stores.forEach(r => {
      //   r.inject(state);
      // });

      // this.article.inject(state);
    }
  }

  // private getStores(): StoreBase<any>[] {
  //   const names = Object.getOwnPropertyNames(this);
  //   return names.filter(r => (this as any)[r] instanceof StoreBase).map(r => (this as any)[r]);
  // }

  public fetch(path: string) {
    if (path === '/') {
      this.home.load();
    }

    // const stores = this.getStores().filter(r => {
    //   const storePath = r.options.path;
    //   const filter = r.options.filter;

    //   if (storePath) {
    //     return storePath === path;
    //   }

    //   if (filter) {
    //     return filter(path);
    //   }
    // });

    // stores.forEach(r => {
    //   r.fetch();
    // });

    // if (path.startsWith('/news/') && path.length > 6) {
    //   this.article.fetch(parseInt(path.slice(6, -1)));
    // }
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
