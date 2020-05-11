import React from 'react';
import { withRouter } from 'react-router-dom';

import { usePage } from '~/renderer/hooks/network';
import { Categories } from './components/Categories';
import { IArticlesPageData } from '~/interfaces';

export default withRouter(() => {
  const [data] = usePage<IArticlesPageData>('articles');

  const categories = React.useMemo(() => {
    if (data?.categories != null) {
      return <Categories data={data.categories} />;
    }

    return null;
  }, [data?.categories]);

  return <>{categories}</>;
});
