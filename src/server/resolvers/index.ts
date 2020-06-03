import { IAppStateItem, IUser } from '~/interfaces';

import { IQueryFilter } from '../interfaces';
import homeResolver from './home';
import articlesResolver from './articles';
import articleResolver from './article';
import addArticleResolver from './add-article';
import editArticleResolver from './edit-article';

export default async (
  item: IAppStateItem,
  filter?: IQueryFilter,
  user?: IUser,
  query?: IQueryFilter,
): Promise<any> => {
  query = query || filter;

  switch (item) {
    case 'home':
      return homeResolver();
    case 'articles':
      return articlesResolver({ ...filter, ...query });
    case 'article':
      return articleResolver(filter?.label, user);
    case 'addArticle':
      return addArticleResolver();
    case 'editArticle':
      return editArticleResolver(filter?.label);
    default:
      throw new Error('Invalid page name');
  }
};
