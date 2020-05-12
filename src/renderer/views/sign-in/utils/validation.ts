import { IValidationMap } from '../interfaces';

export const validateInput = (
  username: string,
  password: string,
): IValidationMap => {
  let usernameError: string;
  let passwordError: string;

  if (!username.length) {
    usernameError = 'Nazwa użytkownika nie może być pusta!';
  }

  if (!password.length) {
    passwordError = 'Hasło nie może być puste!';
  }

  return {
    username: usernameError,
    password: passwordError,
    success: !usernameError && !passwordError,
  };
};
