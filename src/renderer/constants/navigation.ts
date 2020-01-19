import { INavItem } from '~/renderer/app/interfaces';
import {
  STATUE_URL,
  ACHIEVEMENTS_URL,
  PRESS_URL,
  EDZIENNIK_URL,
  CONTEST_URL,
  LESSONS_PLAN_URL,
  REPLACEMENTS_URL,
  PSYCHOLOGIST_URL,
  EDUCATOR_URL,
  CAREER_URL,
  EXAM_URL,
  INTERNSHIPS_URL,
  PARENTS_URL,
  RECRUITMENT_URL,
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
        to: ACHIEVEMENTS_URL,
        label: 'Osiągnięcia',
      },
      {
        to: PRESS_URL,
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
        to: CONTEST_URL,
        label: 'Kółka i olimpiady',
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
        to: PSYCHOLOGIST_URL,
        label: 'Psycholog',
      },
      {
        to: EDUCATOR_URL,
        label: 'Pedagog',
      },
      {
        to: CAREER_URL,
        label: 'Doradca zawodowy',
      },
      {
        to: INTERNSHIPS_URL,
        label: 'Staże zawodowe',
      },
      {
        to: EXAM_URL,
        label: 'Matura',
      },
    ],
  },
  {
    to: PARENTS_URL,
    label: 'Dla rodziców',
  },
  {
    to: RECRUITMENT_URL,
    label: 'Rekrutacja',
  },
  {
    to: '/contact',
    label: 'Kontakt',
  },
];
