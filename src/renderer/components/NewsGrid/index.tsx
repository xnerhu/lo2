import * as React from 'react';

import { INews } from '~/interfaces';
import { NewsCard } from '../NewsCard';
import { reorderNews, getNewsGridColumnsCount } from '~/renderer/app/utils';
import { StyledNewsGrid } from './style';

interface Props {
  items: INews[];
}

export const NewsGrid = ({ items }: Props) => {
  const [visible, setVisible] = React.useState(false);
  const [count, setCount] = React.useState(4);

  const news = React.useMemo(() => {
    return reorderNews(items, count);
  }, [items, count]);

  const resize = React.useCallback(() => {
    const columns = getNewsGridColumnsCount();

    if (columns !== count) {
      setCount(columns);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', resize);

    resize();
    setVisible(true);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <StyledNewsGrid visible={visible}>
      {news.map(r => (
        <NewsCard key={r._id} data={r} />
      ))}
    </StyledNewsGrid>
  );
};
