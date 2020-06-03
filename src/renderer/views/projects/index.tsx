import { SubPage } from '~/renderer/components/SubPage';
import { formatBlogUrl } from '~/renderer/utils/url';

const url = formatBlogUrl('projekty');

export default SubPage({
  title: 'Projekty',
  items: [
    {
      to: url('licealista-na-rynku-pracy'),
      label: 'Licealista na rynku pracy',
    },
    {
      to: url('budowanie-kariery'),
      label: 'Budowanie kariery',
    },
  ],
});
