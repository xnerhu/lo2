import React from 'react';
import { withRouter } from 'react-router';

import { IArticleCategory, IArticle } from '~/interfaces/article';
import { getCategoryOffset } from '~/renderer/app/utils/article';
import { IRouterProps } from '~/renderer/app/interfaces';
import { StyledCategories, Item, Button, Container } from './style';

interface IVisibility {
  left?: boolean;
  right?: boolean;
}

interface Props {
  data: IArticleCategory[];
}

const isItemSelected = (data: IArticleCategory, category: string) => {
  if (data.label === 'all') {
    return !category || category === 'all';
  }

  return data.label === category;
};

export const Categories = withRouter(({ data, match }: IRouterProps<Props>) => {
  const categories: IArticleCategory[] = [
    {
      id: -1,
      label: 'all',
      name: 'Wszystko',
    },
    ...data,
  ];

  const { category } = match.params;

  const [state, setState] = React.useState<IVisibility>({ right: true });

  const ref = React.useRef<HTMLDivElement>();
  const links = React.useRef<HTMLAnchorElement[]>([]);

  const move = React.useCallback((left: boolean) => {
    ref.current.scrollLeft = getCategoryOffset(
      left,
      ref.current,
      links.current,
    );
  }, []);

  const onScroll = React.useCallback(() => {
    const container = ref.current;

    setState({
      left: container.scrollLeft > 0,
      right:
        container.scrollLeft < container.scrollWidth - container.clientWidth,
    });
  }, []);

  links.current = [];

  return (
    <StyledCategories>
      <Button onClick={() => move(true)} disabled={!state.left} />
      <Container ref={ref} onScroll={onScroll}>
        {categories.map((r) => (
          <Item
            key={r.label}
            ref={(r) => r && links.current.push(r as any)}
            to={`/news/${r.label}`}
            selected={isItemSelected(r, category)}
          >
            {r.name}
          </Item>
        ))}
      </Container>
      <Button onClick={() => move(false)} disabled={!state.right} />
    </StyledCategories>
  );
});
