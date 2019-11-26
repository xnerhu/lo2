import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';

import { useStore } from '../../store';
import { Image } from '~/renderer/components/Image';
import { IWithRouterProps } from '~/renderer/app/interfaces';

export default withRouter(observer((props: IWithRouterProps) => {
  const store = useStore();
  const { match } = props;

  const data = store.article.data;

  React.useEffect(() => {
    store.article.load(match.params._id);
  }, [match.params]);

  return (
    <>
      {data._id}
      {/* <Image src={data.image} />
      <h3>{data.title}</h3>
      <h5>{data.content}</h5> */}
    </>
  );
}));

