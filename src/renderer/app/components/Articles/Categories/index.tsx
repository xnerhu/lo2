import React from 'react';
import { withRouter } from 'react-router';

import { IArticleCategory } from '~/interfaces/article';
import { IRouterProps } from '~/renderer/app/interfaces';
import { StyledCategories, Item } from './style';
import { Dropdown } from '~/renderer/components/Dropdown';

interface Props {
  data: IArticleCategory[];
}

export const Categories = withRouter(({ data, match }: IRouterProps<Props>) => {
  const [limit, setLimit] = React.useState<number>(5);

  const visibleItems = data.slice(0, limit ?? data.length);
  const menuItems = data.slice(limit, data.length);

  const [id, setId] = React.useState(null);

  const onChange = (item) => {
    setId(item.id);
  };

  return (
    <StyledCategories>
      {/* {visibleItems.map((r) => (
        <Item key={r.label} to={`/news/${r.label}`}>
          {r.name}
        </Item>
      ))} */}
      <Dropdown items={menuItems} onChange={onChange} value={id} />
    </StyledCategories>
  );
});
