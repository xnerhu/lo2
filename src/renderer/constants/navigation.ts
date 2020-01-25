import { INavItem } from '~/renderer/app/interfaces';
import {
  STATUE_URL,
  EDZIENNIK_URL,
  LESSONS_PLAN_URL,
  REPLACEMENTS_URL,
} from './env';

export const navigationItems: INavItem[] = [
  {
    to: '/',
    label: 'Strona główna',
  },
  {
    to: '/news',
    label: 'Aktualności',
  },
  {
    label: 'O nas',
    subpages: [
      {
        to: '/teachers',
        label: 'Nauczyciele',
      },
      {
        to: '/patron',
        label: 'Nasza patronka',
      },
      {
        to: STATUE_URL,
        label: 'Statut szkoły',
      },
      {
        to: '/history',
        label: 'Historia szkoły',
      },
      {
        to: '/news/osiągnięcia',
        label: 'Osiągnięcia',
      },
      {
        to: '/news/piszą-o-nas',
        label: 'Piszą o nas',
      },
    ],
  },
  {
    label: 'Dla uczniów',
    subpages: [
      {
        to: EDZIENNIK_URL,
        label: 'E-dziennik',
      },
      {
        to: LESSONS_PLAN_URL,
        label: 'Plany zajęć',
      },
      {
        to: REPLACEMENTS_URL,
        label: 'Zastępstwa',
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
  },
  {
    to: '/news/dla-rodziców',
    label: 'Dla rodziców',
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
