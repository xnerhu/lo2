import { SubPage } from '~/renderer/components/SubPage';
import { formatBlogUrl } from '~/renderer/utils/url';

const url = formatBlogUrl('projekty');

export default SubPage({
  title: 'Współpraca międzynarodowa',
  items: [
    {
      to: url('erasmus-plus'),
      label: 'Erasmus+',
    },
    {
      to: url('wymiany-młodzieży'),
      label: 'Wymiany młodzieży',
    },
    {
      to: url('blois'),
      label: 'Blois',
    },
    {
      to: url('pierre-de-coubertain'),
      label: 'Pierre de Coubertain',
    },
  ],
});
