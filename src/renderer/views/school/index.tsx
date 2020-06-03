import { SubPage } from '~/renderer/components/SubPage';
import { formatBlogUrl } from '~/renderer/utils/url';
import { URL_STATUE } from '~/renderer/constants/config';

const url = formatBlogUrl('szkoła');

export default SubPage({
  title: 'Szkoła',
  items: [
    {
      to: '/administracja',
      label: 'Administracja i obsługa',
    },
    {
      to: '/blog/stołówka',
      label: 'Stołówka',
    },
    {
      to: '/blog/pielęgniarka-stomatolog',
      label: 'Pielęgniarka, stomatolog',
    },
    {
      to: '/oddzialy',
      label: 'Oddziały',
    },
    {
      to: '',
      label: 'Kalendarz pracy szkoły',
    },
    {
      to: URL_STATUE,
      label: 'Statut',
    },
    {
      to: '/historia',
      label: 'Historia szkoły',
    },
    {
      to: '/patronka',
      label: 'Patronka szkoły',
    },
    {
      to: url('sapere-auso'),
      label: 'Sapere Auso',
    },
    {
      to: url('najwybitniejszy-absolwent'),
      label: 'Najwybitniejszy absolwent',
    },
    {
      to: '/blog/sukcesy',
      label: 'Sukcesy',
    },
    {
      to: '/blog/wydarzenia',
      label: 'Wydarzenia',
    },
  ],
});
