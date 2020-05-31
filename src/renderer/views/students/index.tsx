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
});
