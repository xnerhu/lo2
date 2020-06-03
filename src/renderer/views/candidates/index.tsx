import { SubPage } from '~/renderer/components/SubPage';
import { formatBlogUrl } from '~/renderer/utils/url';

const url = formatBlogUrl('kandydaci');

export default SubPage({
  title: 'Kandydaci',
  items: [
    {
      to: '/artykul/dlaczego-dwójka',
      label: 'Dlaczego Dwójka?',
    },
    {
      to: url('profile-klas'),
      label: 'Profile klas',
    },
    {
      to: url('zasady-rekrutacji'),
      label: 'Zasady rekrutacji',
    },
    {
      to: url('harmonogram'),
      label: 'Harmonogram',
    },
    {
      to: '/artykul/podręcznik-dla-kandydata',
      label: 'Podręcznik dla kandydata',
    },
    {
      to: url('progi-z-poprzednich-lat'),
      label: 'Progi z poprzednich lat',
    },
    {
      to: url('dzień-dni-otwartych'),
      label: 'Dzień Drzwi Otwartych',
    },
    {
      to: url('konkursy'),
      label: 'Konkursy',
    },
    {
      to: '/artykul/lekcje-w-dwójce',
      label: 'Lekcje w Dwójce',
    },
  ],
});
