import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';

import { useStore } from '~/renderer/app/store';
import { IWithRouterProps } from '~/renderer/app/interfaces';
import { formatGalleryAlbumYear } from '~/utils';
import { IGalleryPicture } from '~/interfaces';
import { getColumns, IColumn } from '~/renderer/app/utils';
import { Info, Year, Title, Chevron, Container, StyledColumn, Picture } from './style';

const Column = ({ data }: { data: IColumn<IGalleryPicture> }) => {
  const { list } = data;

  return (
    <StyledColumn>
      {list.map(r => (
        <Picture key={r._id} src={`/static/gallery/${r._albumId}/${r.name}`} skeletonBorder={8} />
      ))}
    </StyledColumn>
  )
}

export default withRouter(observer((props: IWithRouterProps) => {
  const store = useStore();
  const { match } = props;

  const data = store.album.data;

  React.useEffect(() => {
    store.album.load(match.params._id);
  }, [match.params]);

  React.useEffect(() => {
    return () => {
      store.album.data = {};
    };
  }, []);

  if (!data) return null;

  const { createdAt, title } = data;
  const pictures = data.pictures || [];
  const year = formatGalleryAlbumYear(createdAt);

  const columns = React.useMemo(() => {
    return getColumns(pictures, 4)
  }, [pictures]);

  return (
    <>
      <Info>
        <Year>{year}</Year>
        <Chevron />
        <Title>{title}</Title>
      </Info>
      <Container>
        {columns.map(r => (
          <Column key={r._id} data={r} />
        ))}
      </Container>
    </>
  )
}));
