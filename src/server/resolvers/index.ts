import { IAppStateItem } from '~/interfaces';

import homeResolver from './home';

export default async (item: IAppStateItem): Promise<any> => {
  switch (item) {
    case 'home':
      return homeResolver();
    default:
      throw new Error('Invalid bundle name');
  }
};
