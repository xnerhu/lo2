import loadable from '@loadable/component';

import { IRoute } from '~/renderer/views/app/interfaces';
import { LOADABLE_OPTIONS } from '~/renderer/constants/loadable';

const LazyHome = loadable(
  () => import('~/renderer/views/home'),
  LOADABLE_OPTIONS,
);
const LazyArticles = loadable(
  () => import('~/renderer/views/articles'),
  LOADABLE_OPTIONS,
);

export const routerMap = [
  {
    path: '/articles/:category?/:page?',
    component: LazyArticles,
  },
  {
    path: '/',
    component: LazyHome,
    exact: true,
  },
] as IRoute[];
