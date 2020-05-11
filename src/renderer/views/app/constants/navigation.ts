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
    path: '/articles',
  },
  {
    label: 'Szkoła',
    path: '/about',
  },
  {
    label: 'Uczniowie',
    path: '/students',
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
    path: '/articles',
    icon: ICON_NEWS,
  },
  {
    path: '/student',
    icon: ICON_STUDENT,
  },
];
