import React from 'react';
import { useParams } from 'react-router';

import { ArticleEditor } from '~/renderer/components/ArticleEditor';
import { usePage } from '~/renderer/hooks/network';
import { IEditArticlePageData } from '~/interfaces';
import { PrimaryButton } from '~/renderer/components/Button';
import { ICON_LINK } from '~/renderer/constants/icons';
import { Error, Container } from './style';

export default () => {
  const [data] = usePage<IEditArticlePageData>('editArticle', {
    shouldFetch: ({ label }, cached) => label !== cached?.label,
  });

  if (data?.success === false) {
    return (
      <>
        <Error code="404" label="Nie znaleziono!">
          Artykuł mógł zostać usunięty.
        </Error>
        <Container>
          <PrimaryButton to="/articles" icon={ICON_LINK} iconOnRight>
            Artykuły
          </PrimaryButton>
        </Container>
      </>
    );
  }

  return <ArticleEditor data={data} edit />;
};
