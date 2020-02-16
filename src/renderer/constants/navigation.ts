import { INavItem } from '~/renderer/app/interfaces';
import {
  STATUE_URL,
  EDZIENNIK_URL,
  LESSONS_PLAN_URL,
  REPLACEMENTS_URL,
} from './env';

const selectFilter = (path: string) => {
  return !path.startsWith('/news');
};

export const aboutUsPage: INavItem = {
  label: 'O nas',
  to: '/about',
  selectFilter,
  subpages: [
    {
      to: '/news/osiągnięcia',
      label: 'Osiągnięcia',
    },
    {
      to: '/patron',
      label: 'Nasza patronka',
    },
    {
      to: '/history',
      label: 'Historia szkoły',
    },
    {
      to: '/collaboration',
      label: 'Współpraca zagraniczna',
    },
    {
      to: '/personnel',
      label: 'Personel',
    },
    {
      to: STATUE_URL,
      label: 'Statut szkoły',
      useDefaultLink: true,
    },
    {
      to: '/news/piszą-o-nas',
      label: 'Piszą o nas',
    },
  ],
};

export const studentsPage: INavItem = {
  label: 'Dla uczniów',
  to: '/students',
  selectFilter,
  subpages: [
    {
      to: EDZIENNIK_URL,
      label: 'E-dziennik',
      useDefaultLink: true,
    },
    {
      to: LESSONS_PLAN_URL,
      label: 'Plany zajęć',
    },
    {
      to: REPLACEMENTS_URL,
      label: 'Zastępstwa',
      useDefaultLink: true,
    },
    {
      to: '/news/projekty',
      label: 'Projekty',
    },
    {
      to: '/news/kółka',
      label: 'Kółka',
    },
    {
      to: '/news/olimpiady',
      label: 'Olimpiady',
    },
    {
      to: '/news/wolontariat',
      label: 'Wolontariat',
    },
    {
      to: '/news/matura',
      label: 'Matura',
    },
    {
      to: '/news/psycholog',
      label: 'Psycholog',
    },
    {
      to: '/news/pedagog',
      label: 'Pedagog',
    },
    {
      to: '/news/doradca-zawodowy',
      label: 'Doradca zawodowy',
    },
    {
      to: '/news/staże-zawodowe',
      label: 'Staże zawodowe',
    },
  ],
};

export const navigationItems: INavItem[] = [
  {
    to: '/',
    label: 'Strona główna',
  },
  {
    to: '/news',
    label: 'Aktualności',
  },
  aboutUsPage,
  studentsPage,
  {
    to: '/news/dla-rodziców',
    label: 'Dla rodziców',
  },
  {
    to: 'https://rozdzialiilo2.wordpress.com/',
    label: 'Gazetka',
  },
  {
    to: '/news/rekrutacja',
    label: 'Rekrutacja',
  },
  {
    to: '/contact',
    label: 'Kontakt',
  },
];
