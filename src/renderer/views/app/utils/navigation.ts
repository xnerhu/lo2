import { IRouterProps } from '~/renderer/interfaces';
import { INavItem } from '../interfaces';

export const isNavItemSelected = ({
  path,
  location,
}: IRouterProps<INavItem>) => {
  const { pathname } = location;
  const windowPath = pathname.toLowerCase();

  if (path === '/') {
    return windowPath === path;
  }

  return windowPath.startsWith(path);
};
