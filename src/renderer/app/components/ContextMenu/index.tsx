import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../store';
import { ContextMenuContent } from '../../store/context-menu';
import { AboutMenu } from './About';
import { StyledContextMenu, StyledItem } from './style';

interface ItemProps {
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  hidden?: boolean;
  children: any;
}

export const MenuItem = ({ onClick, children, disabled, hidden }: ItemProps) => {
  const store = useStore();

  const onItemClick = React.useCallback((e: React.MouseEvent) => {
    store.contextMenu.hide();
    if (onClick) onClick(e);
  }, []);

  return (
    <StyledItem onMouseDown={e => e.stopPropagation()} onClick={onItemClick} disabled={disabled} hidden={hidden}>
      {children}
    </StyledItem>
  );
};

export const MenuContainer = observer(({ content, children }: { content: ContextMenuContent, children: any }) => {
  const store = useStore();
  const selected = store.contextMenu.content === content;

  return selected && children;
});

export const ContextMenu = observer(() => {
  const store = useStore();
  const { top, left } = store.contextMenu.pos;

  const onMouseLeave = React.useCallback(store.contextMenu.onMouseLeave(), []);

  return (
    <StyledContextMenu
      ref={store.contextMenu.ref}
      visible={store.contextMenu.visible}
      onMouseEnter={store.contextMenu.onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ top, left }}
    >
      <AboutMenu />
    </StyledContextMenu>
  );
});

