import * as React from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';

import { IAppState, INews, IGallerySection } from '~/interfaces';
import { SliderStore } from './slider';
import { MenuStore } from './menu';
import { PressStore } from './press';
import { StoreBase } from '../models';

class Store {
  public shortNews = new StoreBase<INews>({
    api: 'short-news',
    name: 'shortNews',
    path: '/',
  });

  public slider = new SliderStore();

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
      const stores = this.getStores();

      stores.forEach(r => {
        r.inject(state);
      });
    }
  }

  private getStores(): StoreBase<any>[] {
    const names = Object.getOwnPropertyNames(this);
    return names.filter(r => (this as any)[r] instanceof StoreBase).map(r => (this as any)[r]);
  }

  public fetch(path: string) {
    const stores = this.getStores().filter(r => r.options.path === path);

    stores.forEach(r => {
      r.fetch();
    });
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
