import { CacheBox } from './cache';
import { INews } from '~/interfaces';
import { getHomeNews } from '../services';
import { ICacheData } from '../interfaces';

export class HomeStore {
  public newsCache: CacheBox<INews[]>;

  constructor() {
    this.newsCache = new CacheBox(getHomeNews, this.refetchNews);
  }

  protected refetchNews(data: ICacheData<INews[]>) {
    console.log('xd');
    return true;
  }
}
