import * as React from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';

import { IAppState } from '~/interfaces';
import { HomeStore } from './home';
import { NewsStore } from './news';
import { MenuStore } from './menu';

class Store {
  public home = new HomeStore();
  public news = new NewsStore();
  public menu = new MenuStore();

  @observable
  public loggedIn = false;

  constructor(state?: IAppState) {
    this.home.inject(state);
    this.news.inject(state);
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
