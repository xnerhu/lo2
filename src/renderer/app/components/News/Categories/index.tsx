import React from 'react';

import { IArticleCategory } from '~/interfaces/article';
import { getCategoryOffset } from '~/renderer/app/utils/article';
import { Background, StyledCategories, Item, Button, Container } from './style';

interface Props {
  data: IArticleCategory[];
}

export const Categories = ({ data }: Props) => {
  const ref = React.useRef<HTMLDivElement>();
  const refs = React.useRef<HTMLAnchorElement[]>([]);

  const move = React.useCallback((left: boolean) => {
    ref.current.scrollLeft = getCategoryOffset(left, ref.current, refs.current);
  }, []);

  const onScroll = (e: React.UIEvent) => {
    console.log(ref.current.scrollLeft);
  };

  return (
    <Background>
      <StyledCategories>
        <Button onClick={() => move(true)} />
        <Container ref={ref} onScroll={onScroll}>
          {data.map((r) => (
            <Item ref={(r) => refs.current.push(r)} key={r.id} to="/news">
              {r.name}
            </Item>
          ))}
        </Container>
        <Button onClick={() => move(false)} />
      </StyledCategories>
    </Background>
  );
};
