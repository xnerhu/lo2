import { SubPage } from '~/renderer/components/SubPage';
import {
  URL_REPLACEMENTS,
  URL_LESSONS_PLAN,
  URL_EDZIENNIK,
} from '~/renderer/constants/config';

export default SubPage({
  title: 'Uczniowie',
  items: [
    {
      to: URL_EDZIENNIK,
      label: 'E-dziennik',
      external: true,
    },
    {
      to: URL_LESSONS_PLAN,
      label: 'Plan lekcji',
    },
    {
      to: URL_REPLACEMENTS,
      label: 'Zastępstwa',
      external: true,
    },
    {
      to: '/blog/samorzad-szkolny',
      label: 'Samorząd szkolny',
    },
    {
      to: '/maturzyści',
      label: 'Maturzyści',
    },
    {
      to: '/blog/zajecia-dodatkowe',
      label: 'Zajęcia dodatkowe i uzupełniające',
    },
    {
      to: '/blog/olimpiady',
      label: 'Olimpiady',
    },
    {
      to: '/blog/itn',
      label: 'ITN',
    },
    {
      to: '/blog/stypendia',
      label: 'Stypendia',
    },
    {
      to: '/blog/podreczniki',
      label: 'Podręczniki',
    },
    {
      to: '/projekty',
      label: 'Projekty',
    },
    {
      to: '/wspolpraca-miedzynarodowa',
      label: 'Współpraca międzynarodowa',
    },
    {
      to: '/blog/wolontariat',
      label: 'Wolontariat',
    },
    {
      to: '/blog/biblioteka',
      label: 'Biblioteka',
    },
    {
      to: '/blog/psycholog',
      label: 'Psycholog',
    },
    {
      to: '/blog/pedagog',
      label: 'Pedagog',
    },
    {
      to: '/blog/doradca-zawodowy',
      label: 'Doradca zawodowy',
    },
    {
      to: '/blog/druki-szkolne',
      label: 'Druki szkolne',
    },
  ],
});
