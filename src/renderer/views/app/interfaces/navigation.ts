export interface INavItem {
  path: string;
}

export interface IDesktopNavItem extends INavItem {
  label: string;
}

export interface IMobileNavItem extends INavItem {
  icon: string;
}
