import { IAppStateItem } from '~/interfaces';

import { IQueryFilter } from '../interfaces';
import homeResolver from './home';
import articlesResolver from './articles';

export default async (
  item: IAppStateItem,
  filter?: IQueryFilter,
): Promise<any> => {
  switch (item) {
    case 'home':
      return homeResolver();
    case 'articles':
      return articlesResolver(filter);
    default:
      throw new Error('Invalid bundle name');
  }
};
