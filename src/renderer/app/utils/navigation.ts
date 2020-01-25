import { IRouterProps, INavItem } from '../interfaces';

export const isAppbarItemSelected = ({
  to,
  location,
  subpages,
}: IRouterProps<INavItem>) => {
  const { pathname } = location;
  const path = pathname.toLowerCase();

  if (to === '/') return pathname === to;
  if (path.startsWith(to)) return true;

  if (subpages) {
    return !!subpages.find(r => path.startsWith(r.to));
  }

  return false;
};
