import { SubPage } from '~/renderer/components/SubPage';
import { formatBlogUrl } from '~/renderer/utils/url';

const url = formatBlogUrl('rodzice');

export default SubPage({
  title: 'Rodzice',
  items: [
    {
      to: url('rada-rodziców'),
      label: 'Rada rodziców',
    },
    {
      to: url('terminarz-spotkań'),
      label: 'Terminarz spotkań',
    },
    {
      to: url('ubezpieczenia'),
      label: 'Ubezpieczenia',
    },
  ],
});
