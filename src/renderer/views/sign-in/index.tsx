import React from 'react';

import { SectionTitle } from '~/renderer/components/Section';
import { Input } from '~/renderer/components/Input';
import { ErrorLabel } from '~/renderer/components/Error';
import {
  FormContainer,
  FormContent,
  SubmitButton,
} from '~/renderer/components/Form';
import { validateInput } from './utils/validation';
import { IValidationMap } from './interfaces';
import { signIn } from './utils/auth';

export default () => {
  const [errors, setErrors] = React.useState<IValidationMap>({});

  const userInput = React.useRef<HTMLInputElement>();
  const passwordInput = React.useRef<HTMLInputElement>();

  const onSubmitClick = React.useCallback(async () => {
    const username = userInput.current.value;
    const password = passwordInput.current.value;

    const validation = validateInput(username, password);

    if (!validation.success) {
      return setErrors(validation);
    }

    const res = await signIn({ username, password });

    if (!res.success) {
      console.error(res);
      setErrors({ password: 'Nieprawidłowa nazwa użytkownika lub hasło!' });
    } else {
      window.location.href = '/';
    }
  }, []);

  const onInputKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        onSubmitClick();
      } else if (errors) {
        setErrors({});
      }
    },
    [errors, onSubmitClick],
  );

  return (
    <FormContainer>
      <SectionTitle>Zaloguj się</SectionTitle>
      <FormContent>
        <Input
          ref={userInput}
          placeholder="Nazwa użytkownika"
          type="username"
          error={!!errors.username}
          onKeyDown={onInputKeyDown}
        />
        <ErrorLabel error={errors.username} />
        <Input
          ref={passwordInput}
          placeholder="Hasło"
          type="password"
          error={!!errors.password}
          onKeyDown={onInputKeyDown}
        />
        <ErrorLabel error={errors.password} />
      </FormContent>
      <SubmitButton onClick={onSubmitClick}>Ok</SubmitButton>
    </FormContainer>
  );
};
