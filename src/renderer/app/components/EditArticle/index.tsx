import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router';

import ArticleEditor from '../AddArticle';
import { useStore } from '../../store';
import { IRouterProps } from '../../interfaces';

export default withRouter(
  observer((props: IRouterProps) => {
    const store = useStore();
    const { match } = props;

    React.useEffect(() => {
      store.editArticle.fetch(match.params.label);
    }, [match.params]);

    return <ArticleEditor data={store.editArticle.data} edit />;
  }),
);
