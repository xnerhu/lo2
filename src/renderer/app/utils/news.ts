import { INews } from '~/interfaces';
import { SHORT_MONTHS, IS_BROWSER, MOBILE_VIEW } from '~/renderer/constants';

export const formatArticleDate = (data: INews) => {
  const { createdAt } = data;
  const date = new Date(createdAt);

  const month = SHORT_MONTHS[date.getMonth()];

  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};
