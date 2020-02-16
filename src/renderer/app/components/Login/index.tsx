import React from 'react';
import { withRouter } from 'react-router';
import { observer } from 'mobx-react-lite';

import { IRouterProps } from '../../interfaces';
import { SectionTitle } from '~/renderer/components/Section';
import { Input } from '~/renderer/components/Input';
import { IAuthLoginErrors } from '~/interfaces';
import { ErrorLabel } from '~/renderer/components/Error';
import { useStore } from '../../store';
import {
  FormContainer,
  FormContent,
  SubmitButton,
} from '~/renderer/components/Form';

export default withRouter(
  observer(({ history }: IRouterProps) => {
    const store = useStore();

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

      const res = await store.account.login(username, password);

      if (res.success) {
        history.push({ pathname: '/' });
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
  }),
);
