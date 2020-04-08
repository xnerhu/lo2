import React from 'react';
import { withRouter } from 'react-router';

import { IArticleCategory } from '~/interfaces/article';
import { IRouterProps } from '~/renderer/app/interfaces';
import { IS_BROWSER } from '~/renderer/constants/env';
import { StyledCategories, Item, Dropdown } from './style';

const getIndex = (
  list: number[],
  container: HTMLDivElement,
  dropDown: HTMLDivElement,
) => {
  const containerRect = container.getBoundingClientRect();
  let total = 0;

  for (let i = 0; i < list.length; i++) {
    total += list[i];

    if (total + dropDown.clientWidth >= containerRect.right) {
      const previous = i - 1;
      return previous > 0 ? previous : 0;
    }
  }

  return 0;
};

interface Props {
  data: IArticleCategory[];
}

export const Categories = withRouter(({ data, match }: IRouterProps<Props>) => {
  const [limit, setLimit] = React.useState<number>();

  const ref = React.useRef<HTMLDivElement>();
  const dropDownRef = React.useRef<HTMLDivElement>();

  const list = React.useRef<HTMLAnchorElement[]>([]);
  const widths = React.useRef<number[]>([]);
  const measure = React.useRef(true);

  const visibleItems = data.slice(0, limit ?? data.length);
  const menuItems = data.slice(limit, data.length);

  if (IS_BROWSER) {
    React.useLayoutEffect(() => {
      measure.current = false;

      setTimeout(() => {
        widths.current = list.current.map((r) => r.clientWidth);

        const index = getIndex(
          widths.current,
          ref.current,
          dropDownRef.current,
        );

        setLimit(index);

        ref.current.style.visibility = 'visible';
      }, 1);
    }, []);
  }

  const onResize = React.useCallback(() => {
    const index = getIndex(widths.current, ref.current, dropDownRef.current);

    if (index !== limit) {
      console.log(index);
      setLimit(index);
    }
  }, [limit]);

  const setRef = React.useCallback((ref: HTMLAnchorElement) => {
    if (ref) {
      list.current.push(ref);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [limit]);

  list.current = [];

  return (
    <StyledCategories ref={ref}>
      {visibleItems.map((r) => (
        <Item
          key={r.label}
          innerRef={measure.current ? setRef : undefined}
          to={`/news/${r.label}`}
        >
          {r.name}
        </Item>
      ))}
      {menuItems.length && <Dropdown ref={dropDownRef} items={menuItems} />}
    </StyledCategories>
  );
});
