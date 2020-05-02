import { IAppState } from '~/interfaces';

import ArticleService from '../services/article';

export const appStateResolver = (name: keyof IAppState) => {
  switch (name) {
    case 'articles': {
      return ArticleService.test();
    }
    case 'home':
      return Math.random();
    default:
      throw new Error('Invalid bundle name');
  }
};
