import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../store';
import { Image } from '~/renderer/components/Image';

export default observer(() => {
  const store = useStore();
  const data = store.article.data;

  if (!data) return null;

  console.log(data);

  return (
    <>
      <Image src={data.image} />
      <h3>{data.title}</h3>
      <h5>{data.content}</h5>
    </>
  );
});
