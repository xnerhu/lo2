import React, { ReactElement } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { StyledTest } from './style';

type ItemComponent = React.FunctionComponent<ScrollerItemProps>;

type ItemElement = React.FunctionComponentElement<ScrollerItemProps>;

export interface ScrollerItemProps extends React.Props<any> {
  setRef: (r: HTMLElement) => void;
  index?: number;
}

interface Props {
  max: number;
  visible: number;
  children: ItemComponent;
}

interface ISection {
  offset: number;
  limit: number;
}

export const Scroller = ({ visible, max, children }: Props) => {
  const ref = React.useRef<HTMLDivElement>();
  const refsList = React.useRef<HTMLElement[]>([]);
  const fetched = React.useRef(false);
  const heights = React.useRef<number[]>([]);

  const [section, setSection] = React.useState<ISection>({
    offset: 0,
    limit: visible,
  });

  const setRef = React.useCallback((ref: HTMLElement) => {
    if (!ref) return console.log('xd', null);

    refsList.current.push(ref);
    heights.current.push(ref.scrollHeight);
  }, []);

  const onScroll = React.useCallback(() => {
    const item = refsList.current[section.offset];
    const rect = item.getBoundingClientRect();

    if (rect.bottom < 0) {
      let padding = 0;

      for (let i = 0; i < section.offset + 1; i++) {
        // unmountComponentAtNode(refsList.current[i]);
        // refsList.current[i] = undefined;
        padding += heights.current[i];
        // console.log(heights);
      }

      ref.current.style.paddingTop = padding + 'px';

      // console.log(section.offset + 1);
      if (section.offset + section.limit < max) {
        setSection({
          offset: section.offset + 1,
          limit: section.limit,
        });
      }
    }
  }, [section]);

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [section]);

  const elements: ItemElement[] = [];

  for (let i = section.offset; i < section.offset + section.limit; i++) {
    const el = React.createElement(children, {
      key: i,
      setRef: setRef,
      index: i,
    });

    elements.push(el);
  }

  return <div ref={ref}>{elements}</div>;
};
