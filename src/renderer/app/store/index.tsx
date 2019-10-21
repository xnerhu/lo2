import * as React from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';

import { IAppState } from '~/interfaces';
import { SliderStore } from './slider';
import { ShortNewsStore } from './short-news';

class Store {
  public slider = new SliderStore();
  public shortNews = new ShortNewsStore();

  @observable
  public loggedIn = false;

  constructor(state?: IAppState) {
    if (!state) return;

    const { sliderItems, shortNews } = state;

    if (sliderItems) {
      this.slider.load(sliderItems);
    }

    if (shortNews) {
      this.shortNews.items = shortNews;
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
