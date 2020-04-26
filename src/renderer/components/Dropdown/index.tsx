import React from 'react';

import { Menu, MenuItem } from './Menu';
import { StyledDropdown, Icon } from './style';
import { setMenuPos, toggleMenu } from '~/renderer/app/utils/context-menu';

export type IDropDownItem = {
  id?: any;
  name?: string;
};

interface Props {
  items: IDropDownItem[];
  placeholder?: string;
  value?: any;
  onChange?: (item: IDropDownItem) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Dropdown = React.forwardRef(
  (
    { placeholder, items, value, onChange, ...props }: Props,
    setRef: React.MutableRefObject<HTMLDivElement>,
  ) => {
    const [expanded, setExpanded] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>();
    const menuRef = React.useRef<HTMLDivElement>();

    const selected = React.useMemo(() => items.find((r) => r.id === value), [
      value,
      items,
    ]);

    const onClick = React.useCallback(() => {
      setExpanded(true);
    }, []);

    const onWindowClick = React.useCallback(() => {
      setExpanded(false);
    }, []);

    React.useEffect(() => {
      toggleMenu(menuRef.current, expanded);

      if (expanded) {
        setMenuPos(ref.current, menuRef.current);
        window.addEventListener('click', onWindowClick);
      } else {
        window.removeEventListener('click', onWindowClick);
      }
    }, [expanded]);

    React.useEffect(() => {
      return () => window.removeEventListener('click', onWindowClick);
    }, []);

    const onItemClick = (item: IDropDownItem) => (e: React.MouseEvent) => {
      if (onChange && value !== item.id) {
        onChange(item);
      }
    };

    return (
      <StyledDropdown
        ref={(r) => {
          ref.current = r;
          if (setRef) setRef.current = r;
        }}
        {...props}
        onClick={onClick}
      >
        {selected?.name ?? placeholder}
        <Icon className="drop-down-icon" />
        <Menu ref={menuRef}>
          {items.map(
            (r) =>
              r.id !== value && (
                <MenuItem key={r.id} onClick={onItemClick(r)}>
                  {r.name}
                </MenuItem>
              ),
          )}
        </Menu>
      </StyledDropdown>
    );
  },
);

Dropdown.defaultProps = {
  placeholder: 'Więcej',
  items: [],
} as Props;
