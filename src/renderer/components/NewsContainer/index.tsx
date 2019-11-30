import * as React from 'react';

import { INews } from '~/interfaces';
import { NewsCard } from '../NewsCard';
import { getColumnsCount, getColumns } from '~/renderer/app/utils';
import { DEFAULT_NEWS_COLUMNS_COUNT } from '~/renderer/constants';
import { StyledNewsContainer, StyledColumn } from './style';

interface Props {
  data: INews[];
}

export interface INewsContainerColumn {
  _id: number;
  list: INews[];
  width: string;
}

const Column = ({ data }: { data: INewsContainerColumn }) => {
  const { width, list } = data;

  console.log(width);

  return (
    <StyledColumn style={{ width }}>
      {list.map(r => <NewsCard key={r._id} data={r} />)}
    </StyledColumn>
  )
}

export const NewsContainer = ({ data }: Props) => {
  const ref = React.useRef<HTMLDivElement>();
  const [columns, setColumns] = React.useState<INewsContainerColumn[]>(getColumns(data, getColumnsCount()));

  const updateColumns = React.useCallback(() => {
    const count = getColumnsCount(ref.current);
    const columns = getColumns(data, count);

    setColumns(columns);
  }, []);

  const onWindowResize = React.useCallback((e: UIEvent) => {
    console.log("XDD");
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', onWindowResize);

    // updateColumns();

    return () => {
      window.removeEventListener('resize', onWindowResize);
    }
  }, []);

  return (
    <StyledNewsContainer ref={ref}>
      {columns.map(r => <Column key={r._id} data={r} />)}
    </StyledNewsContainer>
  );
}
