import loadable, { Options } from '@loadable/component';

import { IRoute } from '~/renderer/views/app/interfaces';

const options: Options<any> = { ssr: true };

const LazyHome = loadable(() => import('~/renderer/views/home'), options);
const LazyArticles = loadable(
  () => import('~/renderer/views/articles'),
  options,
);

export const routerMap = [
  {
    path: '/articles',
    component: LazyArticles,
  },
  {
    path: '/',
    component: LazyHome,
    exact: true,
  },
] as IRoute[];
