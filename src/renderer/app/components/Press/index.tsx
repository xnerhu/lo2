import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../store';
import { IPress } from '~/interfaces';
import { formatDate } from '../../utils';
import { SectionTitle } from '~/renderer/components/Section';
import { Link } from './style';

const Item = ({ data }: { data: IPress }) => {
  const { url, name, date, title } = data;

  return (
    <Link href={url} target='_blank'>
      <li>{name}, {formatDate(date)}, {title}</li>
    </Link>
  )
}

export const Press = observer(() => {
  const store = useStore();

  return (
    <>
      <SectionTitle>Artykuły o naszej szkole</SectionTitle>
      <ul>
        {store.press.items.map(r => (
          <Item key={r._id} data={r} />
        ))}
      </ul>
    </>
  );
});
