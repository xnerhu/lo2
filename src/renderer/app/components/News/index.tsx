import React from 'react';
import { withRouter } from 'react-router-dom';

import { usePage } from '../../utils/hooks';
import { Background } from '~/renderer/components/Section';
import { createArticleFilter } from '~/utils/article';
import { INewsPageData } from '~/interfaces';
import { Article } from '~/renderer/components/Article';
import { IArticle } from '~/interfaces/article';
import { Categories } from './Categories';
import { PrimaryButton } from '~/renderer/components/Button';
import { CHEVRON_ICON } from '~/renderer/constants/icons';
import { StyledArticles, Buttons } from './style';

const Articles = ({ data }: { data: IArticle[] }) => {
  return (
    <Background>
      <StyledArticles>
        {data.map((r) => (
          <Article key={r.id} data={r} />
        ))}
        <Buttons>
          <PrimaryButton icon={CHEVRON_ICON} reversed>
            Starsze
          </PrimaryButton>
          <PrimaryButton icon={CHEVRON_ICON} iconOnRight>
            Nowsze
          </PrimaryButton>
        </Buttons>
      </StyledArticles>
    </Background>
  );
};

export default withRouter((props) => {
  const data = usePage<INewsPageData>('news');
  const { match } = props;

  const filter = React.useMemo(() => {
    return createArticleFilter(match.params);
  }, [match.params]);

  return (
    <>
      <Categories data={data.categories ?? []} />
      <Articles data={data.articles ?? []} />
    </>
  );
});
