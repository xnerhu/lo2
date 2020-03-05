import React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter, Link } from 'react-router-dom';

import { useStore } from '~/renderer/app/store';
import { Dropdown, IDropDownItem } from '~/renderer/components/Dropdown';
import { IRouterProps } from '~/renderer/app/interfaces';
import { INewsFilter } from '~/interfaces';
import { stringifyNewsFilter } from '~/renderer/app/utils/news';
import { StyledToolbar, Button } from './style';

interface Props {
  filter: INewsFilter;
}

export const Toolbar = withRouter(
  observer((props: IRouterProps<Props>) => {
    const { history, filter } = props;
    const store = useStore();

    const onDropdown = React.useCallback(
      (e: IDropDownItem) => {
        history.push({
          pathname: stringifyNewsFilter({
            categoryLabel: e.id,
          }),
        });
      },
      [filter],
    );

    return (
      <StyledToolbar>
        <Dropdown
          items={store.news.dropdownItems}
          value={filter.categoryLabel || 'all'}
          onChange={onDropdown}
        />
        {store.account.isLogged && (
          <Link to="/add-article">
            <Button>Dodaj nowy</Button>
          </Link>
        )}
      </StyledToolbar>
    );
  }),
);
