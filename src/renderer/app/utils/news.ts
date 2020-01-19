import { INews } from '~/interfaces';
import { SHORT_MONTHS, IS_BROWSER, MOBILE_VIEW } from '~/renderer/constants';

export const formatArticleDate = (data: INews) => {
  const { createdAt } = data;
  const date = new Date(createdAt);

  const month = SHORT_MONTHS[date.getMonth()];

  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};

export const reorderNews = (items: INews[], count: number) => {
  const ordered = [];
  let column = 0;

  while (column < count) {
    for (let i = 0; i < items.length; i += count) {
      const _val = items[i + column];

      if (_val != null) {
        ordered.push(_val);
      }
    }

    column++;
  }

  return ordered;
};

export const getNewsGridColumnsCount = () => {
  if (!IS_BROWSER) return 4;

  const width = window.innerWidth;

  if (width <= 872) return 1;
  if (width <= MOBILE_VIEW) return 2;
  if (width <= 1366) return 3;

  return 4;
};
