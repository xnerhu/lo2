import { SubPage } from '~/renderer/components/SubPage';

const getUrl = (subcategory: string) => {
  return `/blog/maturzyści?subcategory=${subcategory}`;
};

export default SubPage({
  title: 'Maturzyści',
  items: [
    {
      to: getUrl('terminarz'),
      label: 'Terminarz',
    },
    {
      to: getUrl('procedury'),
      label: 'Procedury',
    },
    {
      to: getUrl('matura-dla-absolwentów'),
      label: 'Matura dla absolwentów',
    },
    {
      to: getUrl('wyniki-z-poprzednich-lat'),
      label: 'Wyniki z poprzednich lat',
    },
    {
      to: getUrl('studniówka'),
      label: 'Studniówka',
    },
    {
      to: getUrl('oferty-szkół-wyższych'),
      label: 'Oferty szkół wyższych',
    },
  ],
});
