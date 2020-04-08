import React from 'react';

import { Menu, MenuItem } from './Menu';
import { StyledDropdown, Icon } from './style';

export type IDropDownItem = {
  id?: any;
  name?: string;
};

interface Props {
  placeholder: string;
  items: IDropDownItem[];
  value: any;
  onChange?: (item: IDropDownItem) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Dropdown = ({
  placeholder,
  items,
  value,
  onChange,
  ...props
}: Props) => {
  const [expanded, setExpanded] = React.useState(false);

  const selected = React.useMemo(() => items.find((r) => r.id === value), [
    value,
    items,
  ]);

  const onClick = React.useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const onWindowClick = React.useCallback(() => {
    setExpanded(false);
  }, []);

  const onItemClick = (item: IDropDownItem) => (e: React.MouseEvent) => {
    if (onChange && value !== item.id) {
      onChange(item);
    }
  };

  React.useEffect(() => {
    if (expanded) {
      window.addEventListener('click', onWindowClick);
    } else {
      window.removeEventListener('click', onWindowClick);
    }
  }, [expanded]);

  React.useEffect(() => {
    return () => window.removeEventListener('click', onWindowClick);
  }, []);

  return (
    <StyledDropdown onClick={onClick} {...props}>
      {selected?.name ?? placeholder}
      <Icon />
      <Menu expanded={expanded}>
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
};

Dropdown.defaultProps = {
  placeholder: 'Więcej',
  items: [],
} as Props;
