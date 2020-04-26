import React from 'react';
import { withRouter } from 'react-router';

import { IRouterProps } from '../../interfaces';
import { SectionTitle } from '~/renderer/components/Section';
import { Input } from '~/renderer/components/Input';
import { IChangePasswordRes } from '~/interfaces';
import { ErrorLabel } from '~/renderer/components/Error';
import {
  FormContainer,
  FormContent,
  SubmitButton,
} from '~/renderer/components/Form';
import { callApi } from '../../utils/network';
import { useAppState } from '../../store';

export default withRouter(({ history }: IRouterProps) => {
  const appState = useAppState();

  if (!appState.signedIn) {
    React.useEffect(() => {
      history.push('/login');
    }, []);

    return null;
  }

  const [error, setError] = React.useState<string>(null);

  const newPasswordInput = React.useRef<HTMLInputElement>();
  const repeatPasswordInput = React.useRef<HTMLInputElement>();

  const onInputKeyDown = React.useCallback(() => {
    if (!!error) {
      setError(null);
    }
  }, [error]);

  const onSubmitClick = React.useCallback(async () => {
    const password = newPasswordInput.current.value;
    const repeated = repeatPasswordInput.current.value;

    if (!password.length || !repeated.length) {
      return setError('Uzupełnij puste pola!');
    }

    if (password !== repeated) {
      return setError('Hasła nie są takie same!');
    }

    const res = await callApi<IChangePasswordRes>(
      '/auth/change-password',
      { password },
      'post',
    );

    if (res.success) {
      window.location.href = '/login';
    } else {
      setError(error);
    }
  }, []);

  return (
    <FormContainer autoComplete="off">
      <SectionTitle>Zmień hasło</SectionTitle>
      <FormContent>
        <Input
          ref={newPasswordInput}
          placeholder="Nowe hasło"
          type="password"
          error={!!error}
          onKeyDown={onInputKeyDown}
          autoComplete="new-password"
        />
        <Input
          ref={repeatPasswordInput}
          placeholder="Powtórz hasło"
          type="password"
          error={!!error}
          onKeyDown={onInputKeyDown}
        />
        <ErrorLabel error={error} />
      </FormContent>
      <SubmitButton onClick={onSubmitClick}>Zapisz</SubmitButton>
    </FormContainer>
  );
});
