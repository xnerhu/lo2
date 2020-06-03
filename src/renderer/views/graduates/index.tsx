import { SubPage } from '~/renderer/components/SubPage';
import { formatBlogUrl } from '~/renderer/utils/url';

const url = formatBlogUrl('maturzyści');

export default SubPage({
  title: 'Maturzyści',
  items: [
    {
      to: url('terminarz'),
      label: 'Terminarz',
    },
    {
      to: url('procedury'),
      label: 'Procedury',
    },
    {
      to: url('matura-dla-absolwentów'),
      label: 'Matura dla absolwentów',
    },
    {
      to: url('wyniki-z-poprzednich-lat'),
      label: 'Wyniki z poprzednich lat',
    },
    {
      to: url('studniówka'),
      label: 'Studniówka',
    },
    {
      to: url('oferty-szkół-wyższych'),
      label: 'Oferty szkół wyższych',
    },
  ],
});
