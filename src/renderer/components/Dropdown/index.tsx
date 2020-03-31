import React from 'react';

import { StyledDropdown, Label, DropIcon, Menu, MenuItem } from './style';

export type IDropDownItem<T = {}> = {
  id?: any;
  name?: string;
} & T;

interface Props {
  items: IDropDownItem[];
  onChange?: (item: IDropDownItem) => void;
  value: any;
}

export const Dropdown = ({ items, onChange, value }: Props) => {
  const [expanded, setExpanded] = React.useState(false);
  const selected = React.useMemo(() => items.find((r) => r.id === value), [
    value,
    items,
  ]);

  const onClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (!expanded) {
        window.addEventListener('click', onWindowClick);
      } else {
        window.removeEventListener('click', onWindowClick);
      }

      setExpanded(!expanded);
    },
    [expanded],
  );

  const onWindowClick = React.useCallback(() => {
    setExpanded(false);
  }, []);

  const onItemClick = (item: IDropDownItem) => (e: React.MouseEvent) => {
    if (onChange && value !== item.id) {
      onChange(item);
    }
  };

  React.useEffect(() => {
    return () => {
      window.removeEventListener('click', onWindowClick);
    };
  }, []);

  return (
    <StyledDropdown onClick={onClick}>
      {selected && (
        <>
          <Label>{selected.name}</Label>
          <DropIcon className="drop-down-icon" expanded={expanded} />
          <Menu expanded={expanded}>
            {items.map((r) => (
              <MenuItem
                key={r.id}
                selected={r.id === selected.id}
                onClick={onItemClick(r)}
              >
                {r.name}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </StyledDropdown>
  );
};
