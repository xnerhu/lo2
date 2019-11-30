import { INews } from '~/interfaces';
import { IS_BROWSER, DEFAULT_NEWS_COLUMNS_COUNT, NEWS_CARD_MARGIN, NEWS_CARD_WIDTH, CONTENT_WIDTH } from '~/renderer/constants';
import { INewsContainerColumn } from '~/renderer/components/NewsContainer';

export const formatArticleDate = (data: INews) => {
  const { createdAt } = data;
  const date = new Date(createdAt);

  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export const getContentWidth = () => {
  if (!IS_BROWSER) return 3000;

  return 500;

  // @media(max-width: ${CONTENT_WIDTH + 48 * 2}px) {
  //   max-width: calc(100% - 128px);
  // }

  // @media(max-width: 767px) {
  //   max-width: calc(100% - 64px);
  // }
}

export const getNewsCardWidth = (count: number) => {
  const margin = NEWS_CARD_MARGIN / CONTENT_WIDTH * 100;

  return (100 - margin * (count - 1)) / count;
}

export const getColumnsCount = (ref?: HTMLDivElement) => {
  if (!IS_BROWSER) return DEFAULT_NEWS_COLUMNS_COUNT;

  console.log(ref);
  const width = ref ? ref.clientWidth : getContentWidth();

  return Math.floor((width + NEWS_CARD_MARGIN) / (NEWS_CARD_MARGIN + NEWS_CARD_WIDTH));
}

export const getColumns = (data: INews[], count: number) => {
  const columns: Array<INewsContainerColumn> = new Array();
  const width = `${getNewsCardWidth(count)}%`;

  data.forEach((r, index) => {
    const chunkIndex = index % count;

    if (!columns[chunkIndex]) {
      columns[chunkIndex] = { _id: r._id, list: [], width };
    }

    columns[chunkIndex].list.push(r);
  });

  return columns;
}
