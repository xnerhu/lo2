import { IRouterProps, INavItem } from '../interfaces';

export const isAppbarItemSelected = ({
  to,
  location,
  subpages,
  selectFilter,
}: IRouterProps<INavItem>) => {
  const { pathname } = location;
  const path = pathname.toLowerCase();

  if (to === '/') return pathname === to;
  if (path.startsWith(to)) return true;

  if (subpages) {
    return !!subpages.find((r) => {
      if (selectFilter != null && !selectFilter(path)) return false;
      return path.startsWith(r.to);
    });
  }

  return false;
};
