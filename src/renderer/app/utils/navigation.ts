import { IAppBarItemProps } from '~/renderer/app/components/Appbar';

export const isAppbarItemSelected = ({ to, location, subpages }: IAppBarItemProps) => {
  const { pathname } = location;
  const path = pathname.toLowerCase();

  if (to === '/') return pathname === to;
  if (path.startsWith(to)) return true;

  if (subpages) {
    return subpages.findIndex(r => path.startsWith(r)) !== -1;
  }

  return false;
}
