import * as React from 'react';

import { icons } from '~/renderer/constants';
import { StyledDropdown, Label, DropIcon, Menu, MenuItem } from './style';

export interface IDropDownItem {
  _id?: any;
  title?: string;
}

interface Props {
  items: IDropDownItem[];
  onChange?: (item: IDropDownItem) => void;
}

export const Dropdown = ({ items, onChange }: Props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState<IDropDownItem>(items.length && items[0]);

  const onClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();

    if (!expanded) {
      window.addEventListener('click', onWindowClick);
    } else {
      window.removeEventListener('click', onWindowClick);
    }

    setExpanded(!expanded);
  }, [expanded]);

  const onWindowClick = React.useCallback(() => {
    setExpanded(false);
  }, []);

  const onItemClick = (item: IDropDownItem) => (e: React.MouseEvent) => {
    if (onChange && selected !== item) onChange(item);
    setSelected(item);
  }

  React.useEffect(() => {
    if (items.length) {
      setSelected(items[0]);
    }
  }, [items]);

  return (
    <StyledDropdown onClick={onClick}>
      {selected && <>
        <Label>{selected.title}</Label>
        <DropIcon src={icons.drop} size={20} expanded={expanded} />
        <Menu expanded={expanded}>
          {items.map(r => (
            <MenuItem key={r._id} selected={r._id === selected._id} onClick={onItemClick(r)}>{r.title}</MenuItem>
          ))}
        </Menu>
      </>}
    </StyledDropdown>
  )
}
