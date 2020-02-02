import React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

import { IRouterProps } from '~/renderer/app/interfaces';
import { INewsFilter } from '~/interfaces';
import { useStore } from '~/renderer/app/store';
import { stringifyNewsFilter } from '~/renderer/app/utils';
import { Button } from '~/renderer/components/Button';
import { icons } from '~/renderer/constants';
import { StyledPagination } from './style';

interface Props {
  filter: INewsFilter;
}

const getCallback = (
  history: History,
  filter: INewsFilter,
  page: number,
  newer = true,
) => () => {
  history.push({
    pathname: stringifyNewsFilter({
      categoryLabel: filter.categoryLabel || 'all',
      page: newer ? page - 1 : page + 1,
    }),
  });
};

export const Pagination = withRouter(
  observer((props: IRouterProps<Props>) => {
    const { history, filter } = props;
    const store = useStore();
    const page = filter.page || 1;

    const onNewer = React.useCallback(getCallback(history, filter, page), [
      filter,
    ]);

    const onOlder = React.useCallback(
      getCallback(history, filter, page, false),
      [filter],
    );

    if (!store.news.items.length) return null;

    return (
      <StyledPagination>
        <Button
          onClick={onNewer}
          disabled={page === 1}
          icon={icons.chevron}
          reversedIcon
        >
          Nowsze
        </Button>
        <Button
          onClick={onOlder}
          disabled={!store.news.nextPage}
          icon={icons.chevron}
        >
          Starsze
        </Button>
      </StyledPagination>
    );
  }),
);
