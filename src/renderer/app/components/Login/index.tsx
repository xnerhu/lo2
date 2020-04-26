import React from 'react';
import axios from 'axios';

import { SectionTitle } from '~/renderer/components/Section';
import { Input } from '~/renderer/components/Input';
import { IAuthLoginErrors, IAuthLoginRes } from '~/interfaces';
import { ErrorLabel } from '~/renderer/components/Error';
import {
  FormContainer,
  FormContent,
  SubmitButton,
} from '~/renderer/components/Form';

const login = async (username: string, password: string) => {
  const res = await axios.post<IAuthLoginRes>('/api/auth/login', {
    username,
    password,
  });

  return res.data;
};

export default () => {
  const [errors, setErrors] = React.useState<IAuthLoginErrors>({});

  const userInput = React.useRef<HTMLInputElement>();
  const passwordInput = React.useRef<HTMLInputElement>();

  const onInputKeyDown = React.useCallback(() => {
    if (errors) {
      setErrors({});
    }
  }, [errors]);

  const onSubmitClick = React.useCallback(async () => {
    const username = userInput.current.value;
    const password = passwordInput.current.value;

    const res = await login(username, password);

    if (res.success) {
      window.location.href = '/';
    } else {
      setErrors(res.errors);
    }
  }, []);

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
