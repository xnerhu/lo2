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
  label: 'Szkoła',
  to: '/about',
  selectFilter,
  subpages: [
    {
      to: '/personnel',
      label: 'Nauczyciele',
    },
    {
      to: '/news/administracja-i-obsluga',
      label: 'Administracja i obsługa',
    },
    {
      to: '/news/stolowka',
      label: 'Stołówka',
    },
    {
      to: '/news/pielegniarka-stomatolog',
      label: 'Pielęgniarka, stomatolog',
    },
    // {
    //   to: '/news/oddzialy',
    //   label: 'Oddziały',
    // },
    {
      to: '/news/Kalendarz pracy szkoły',
      label: 'Kalendarz pracy szkoły',
    },
    {
      to: STATUE_URL,
      label: 'Statut szkoły',
      useDefaultLink: true,
    },
    {
      to: '/history',
      label: 'Historia szkoły',
    },
    {
      to: '/patron',
      label: 'Patronka szkoły',
    },
    {
      to: '/news/sapere-auso',
      label: 'Sapere Auso',
    },
    {
      to: '/news/najwybitniejszy-absolwent',
      label: 'Najwybitniejszy absolwent',
    },
    // {
    //   to: '/news/sukcesy',
    //   label: 'Sukcesy',
    // },
    {
      to: '/news/wydarzenia',
      label: 'Wydarzenia',
    },
    {
      to: '/oddzialy',
      label: 'Oddziały',
    },
    {
      to: '/sukcesy',
      label: 'Sukcesy',
    },
  ],
};

export const studentsPage: INavItem = {
  label: 'Uczniowie',
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
      label: 'Plan lekcji',
    },
    {
      to: REPLACEMENTS_URL,
      label: 'Zastępstwa',
      useDefaultLink: true,
    },
    {
      to: '/news/samorzad-szkolny',
      label: 'Samorząd szkolny',
    },
    {
      to: '/news/zajecia-dodatkowe',
      label: 'Zajęcia dodatkowe',
    },
    {
      to: '/news/olimpiady',
      label: 'Olimpiady',
    },
    {
      to: '/news/itn',
      label: 'ITN',
    },
    {
      to: '/news/stypendia',
      label: 'Stypendia',
    },
    {
      to: '/news/podreczniki',
      label: 'Podręczniki',
    },
    // {
    //   to: '/news/projekty',
    //   label: 'Projekty',
    // },
    // {
    //   to: '/news/wspolpraca-miedzynarodowa',
    //   label: 'Współpraca międzynarodowa',
    // },
    {
      to: '/news/wolontariat',
      label: 'Wolontariat',
    },
    {
      to: '/news/biblioteka',
      label: 'Biblioteka',
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
      to: '/news/druki-szkolne',
      label: 'Druki szkolne',
    },
    {
      to: '/maturzysci',
      label: 'Maturzyści',
    },
    {
      to: '/projekty',
      label: 'Projekty',
    },
    {
      to: '/wspolpraca-miedzynarodowa',
      label: 'Współpraca międzynarodowa',
    },
  ],
};

export const candidatesPage: INavItem = {
  label: 'Kandydaci',
  to: '/kandydaci',
  selectFilter: (path) => path.startsWith('/kandydaci'),
  subpages: [
    {
      to: '/',
      label: 'Dlaczego Dwójka?',
    },
    {
      to: '/',
      label: 'Profile klas',
    },
    {
      to: '/',
      label: 'Zasady rekrutacji',
    },
    {
      to: '/',
      label: 'Harmonogram',
    },
    {
      to: '/',
      label: 'Podręcznik dla kandydata',
    },
    {
      to: '/',
      label: 'Progi z poprzednich lat',
    },
    {
      to: '/',
      label: 'Dzień Drzwi Otwartych',
    },
    {
      to: '/',
      label: 'Konkursy',
    },
    {
      to: '/',
      label: 'Lekcje w Dwójce',
    },
  ],
};

export const parentsPage: INavItem = {
  label: 'Rodzice',
  to: '/rodzice',
  selectFilter: (path) => path.startsWith('/rodzice'),
  subpages: [
    {
      to: '/news/rada-rodzicow',
      label: 'Rada Rodziców',
    },
    {
      to: '/news/terminarz-spotkan',
      label: 'Terminarz spotkań',
    },
    {
      to: '/news/ubezpieczenia',
      label: 'Ubezpieczenia',
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
  candidatesPage,
  parentsPage,
  {
    to: 'https://rozdzialiilo2.wordpress.com/',
    label: 'Gazetka',
  },
  {
    to: '/contact',
    label: 'Kontakt',
  },
];

export const branchesPage: INavItem = {
  label: 'Oddziały',
  subpages: [
    {
      to: '/news/zdjecia-klasowe',
      label: 'Zdjęcia klasowe',
    },
  ],
};

export const successesPage: INavItem = {
  label: 'Sukcesy',
  subpages: [
    {
      to: '/news/sukcesy-2019-2020',
      label: '2019/2020',
    },
    {
      to: '/news/sukcesy-2018-2019',
      label: '2018/2019',
    },
    {
      to: '/news/sukcesy-archiwum',
      label: 'Archiwum',
    },
  ],
};

export const graduatesPage: INavItem = {
  label: 'Maturzyści',
  subpages: [
    {
      to: '/news/maturzysci-terminarz',
      label: 'Terminarz',
    },
    {
      to: '/news/maturzysci-procedury',
      label: 'Procedury',
    },
    {
      to: '/news/matura-dla-absolwentow',
      label: 'Matura dla absolwentów',
    },
    {
      to: '/news/matura-wyniki-z-poprzednich-lat',
      label: 'Wyniki z poprzednich lat',
    },
    {
      to: '/news/studniowka',
      label: 'Studniówka',
    },
    {
      to: '/news/oferty-szkol-wyzszych',
      label: 'Oferty szkół wyższych',
    },
  ],
};

export const projectsPage: INavItem = {
  label: 'Projekty',
  subpages: [
    {
      to: '/news/licealista-na-rynku-pracy',
      label: 'Licealista na rynku pracy',
    },
    {
      to: '/news/budowanie-kariery',
      label: 'Budowanie kariery',
    },
  ],
};

export const internationalCooperationPage: INavItem = {
  label: 'Współpraca międzynarodowa',
  subpages: [
    {
      to: '/news/erasmus',
      label: 'Erasmus+',
    },
    {
      to: '/news/wymiany-mlodziezy',
      label: 'Wymiany młodzieży',
    },
    {
      to: '/news/blois',
      label: 'Blois',
    },
    {
      to: '/news/pierre-de-coubertain',
      label: 'Pierre de Coubertain',
    },
  ],
};
