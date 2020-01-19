import * as React from 'react';

import { Container, SearchIcon, StyledInput } from './style';

interface Props {
  placeholder?: string;
  onChange?: (value: string) => void;
  innerRef?: React.Ref<HTMLInputElement>;
  style?: React.CSSProperties;
  defaultValue?: string;
}

export const Input = ({
  placeholder,
  onChange,
  innerRef,
  style,
  defaultValue,
}: Props) => {
  const [focused, setFocused] = React.useState(false);
  const timer = React.useRef<number>(null);

  const onInput = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    },
    [],
  );

  const onFocus = React.useCallback(() => {
    setFocused(true);
  }, []);

  const onBlur = React.useCallback(() => {
    setFocused(false);
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Container focused={focused} style={style}>
      <SearchIcon />
      <StyledInput
        ref={innerRef}
        onKeyDown={onInput}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        autoCorrect="off"
        spellCheck={false}
        defaultValue={defaultValue}
      />
    </Container>
  );
};
