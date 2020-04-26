import * as React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

import ArticleEditor from '../AddArticle';
import { useStore } from '../../store';
import { IRouterProps } from '../../interfaces';
import { usePage } from '../../utils/hooks';
import { IEditArticleData } from '~/server/interfaces';
import { IEditArticlePacket } from '~/interfaces';

interface Filter {
  label: string;
}

export default withRouter(({ match }: IRouterProps) => {
  const { label } = match.params;

  const [pageData, setData, filter] = usePage<IEditArticlePacket, Filter>(
    'editArticle',
    {
      label,
    },
  );

  React.useEffect(() => {
    if (filter.label !== label) {
      (async () => {
        const res = await axios.get<IEditArticlePacket>(
          `/api/page/editArticle`,
          {
            params: { label },
          },
        );

        setData(res.data, { label });
      })();
    }
  }, [label]);

  return <ArticleEditor data={pageData.item} edit />;
});
