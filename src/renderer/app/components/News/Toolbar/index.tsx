import React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';

import { stringifyNewsFilter } from '~/renderer/app/utils';
import { useStore } from '~/renderer/app/store';
import { Dropdown, IDropDownItem } from '~/renderer/components/Dropdown';
import { IRouterProps } from '~/renderer/app/interfaces';
import { INewsFilter } from '~/interfaces';
import { StyledToolbar } from './style';

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
      </StyledToolbar>
    );
  }),
);
