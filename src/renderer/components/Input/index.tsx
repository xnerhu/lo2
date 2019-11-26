import * as React from 'react';

import { icons } from '~/renderer/constants';
import { Container, SearchIcon, StyledInput } from './style';

interface Props {
  placeholder?: string;
  onChange?: (value: string) => void;
  innerRef?: React.Ref<HTMLInputElement>;
  style?: React.CSSProperties;
  defaultValue?: string;
  label?: string;
}

export const Input = ({ placeholder, onChange, innerRef, style, defaultValue, label }: Props) => {
  const timer = React.useRef<number>(null);

  const onInput = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (e.key === 'Escape') {
      target.value = '';
    } else if (e.key === 'Enter') {
      onChange(target.value);
    } else {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        onChange(target.value);
      }, 500);
    }
  }, []);

  return (
    <Container style={style}>
      <SearchIcon src={icons.search} size={20} />
      <StyledInput ref={innerRef} onKeyDown={onInput} placeholder={placeholder} autoCorrect='off' spellCheck={false} defaultValue={defaultValue} label={label} />
    </Container>
  )
}
