import { SubPage } from '~/renderer/components/SubPage';
import { formatBlogUrl } from '~/renderer/utils/url';

export default SubPage({
  title: 'Kandydaci',
  items: [
    {
      to: '/artykul/dlaczego-dwójka',
      label: 'Dlaczego Dwójka?',
    },
    {
      to: '/artykul/profile-klas',
      label: 'Profile klas',
    },
    {
      to: '/artykul/zasady-rekrutacji',
      label: 'Zasady rekrutacji',
    },
    {
      to: '/artykul/harmonogram',
      label: 'Harmonogram',
    },
    {
      to: '/artykul/podręcznik-dla-kandydata',
      label: 'Podręcznik dla kandydata',
    },
    {
      to: '/artykul/progi-z-poprzednich-lat',
      label: 'Progi z poprzednich lat',
    },
    {
      to: '/artykul/dzień-drzwi-otwartych',
      label: 'Dzień Drzwi Otwartych',
    },
    {
      to: '/artykul/',
      label: 'Konkursy',
    },
    {
      to: '/artykul/',
      label: 'Lekcje w Dwójce',
    },
  ],
});
