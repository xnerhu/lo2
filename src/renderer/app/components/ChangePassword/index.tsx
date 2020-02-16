import React from 'react';
import { withRouter } from 'react-router';
import { observer } from 'mobx-react-lite';

import { IRouterProps } from '../../interfaces';
import { SectionTitle } from '~/renderer/components/Section';
import { Input } from '~/renderer/components/Input';
import { IChangePasswordRes } from '~/interfaces';
import { ErrorLabel } from '~/renderer/components/Error';
import { useStore } from '../../store';
import {
  FormContainer,
  FormContent,
  SubmitButton,
} from '~/renderer/components/Form';
import { callApi } from '../../utils';

export default withRouter(
  observer(({ history }: IRouterProps) => {
    const store = useStore();

    if (!store.account.isLogged) {
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
        'change-password',
        { password },
        'post',
      );

      if (res.success) {
        history.push('/login');
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
  }),
);
