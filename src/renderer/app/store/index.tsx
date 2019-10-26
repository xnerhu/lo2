import * as React from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';

import { IAppState } from '~/interfaces';
import { SliderStore } from './slider';
import { ShortNewsStore } from './short-news';
import { MenuStore } from './menu';
import { PressStore } from './press';
import { TeachersStore } from './teachers';

class Store {
  public slider = new SliderStore();
  public shortNews = new ShortNewsStore();
  public menu = new MenuStore();
  public press = new PressStore();
  public teachers = new TeachersStore();

  @observable
  public loggedIn = false;

  constructor(state?: IAppState) {
    if (!state) return;
    this.insertState(state);
  }

  private insertState(state: IAppState) {
    const { sliderItems, shortNews, pressItems, teachersItems } = state;

    this.slider.load(sliderItems || [])
    this.shortNews.items = shortNews || [];
    this.press.items = pressItems || [];
    this.teachers.items = teachersItems || [];
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
