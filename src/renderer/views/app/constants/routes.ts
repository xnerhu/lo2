import loadable from '@loadable/component';

import { IRoute } from '~/renderer/views/app/interfaces';
import { LOADABLE_OPTIONS } from '~/renderer/constants/loadable';

export const routerMap = [
  {
    path: '/sign-in',
    component: loadable(
      () => import('~/renderer/views/sign-in'),
      LOADABLE_OPTIONS,
    ),
  },
  {
    path: '/cms/article/:label',
    component: loadable(
      () => import('~/renderer/views/edit-article'),
      LOADABLE_OPTIONS,
    ),
  },
  {
    path: '/cms/article',
    component: loadable(
      () => import('~/renderer/views/add-article'),
      LOADABLE_OPTIONS,
    ),
  },
  {
    path: '/article/:label',
    component: loadable(
      () => import('~/renderer/views/article'),
      LOADABLE_OPTIONS,
    ),
  },
  {
    path: '/articles/:category?/:page?',
    component: loadable(
      () => import('~/renderer/views/articles'),
      LOADABLE_OPTIONS,
    ),
  },
  {
    path: '/',
    exact: true,
    component: loadable(
      () => import('~/renderer/views/home'),
      LOADABLE_OPTIONS,
    ),
  },
] as IRoute[];
