import { SubPage } from '~/renderer/components/SubPage';

export default () =>
  SubPage({
    title: 'Projekty',
    items: [
      {
        to: '/news/licealista-na-rynku-pracy',
        label: 'Licealista na rynku pracy',
      },
      {
        to: '/news/budowanie-kariery',
        label: 'Budowanie kariery',
      },
    ],
  });
