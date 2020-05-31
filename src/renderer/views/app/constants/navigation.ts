import { IDesktopNavItem, IMobileNavItem } from '../interfaces';
import {
  ICON_HOME,
  ICON_NEWS,
  ICON_STUDENT,
  ICON_MENU,
} from '~/renderer/constants/icons';

export const desktopNavMap: IDesktopNavItem[] = [
  {
    label: 'Strona główna',
    path: '/',
  },
  {
    label: 'Aktualności',
    path: '/blog',
  },
  {
    label: 'Szkoła',
    path: '/about',
  },
  {
    label: 'Uczniowie',
    path: '/uczniowie',
  },
  {
    label: 'Kandydaci',
    path: '/kandydaci',
  },
  {
    label: 'Rodzice',
    path: '/rodzice',
  },
  {
    label: 'Kontakt',
    path: '/contakt',
  },
];

export const mobileNavMap: IMobileNavItem[] = [
  {
    path: '/',
    icon: ICON_HOME,
  },
  {
    path: '/blog',
    icon: ICON_NEWS,
  },
  {
    path: '/uczniowie',
    icon: ICON_STUDENT,
  },
];
