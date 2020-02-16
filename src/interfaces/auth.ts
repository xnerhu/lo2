import { IUser } from './user';

export interface IAuthLoginErrors {
  username?: string;
  password?: string;
}

export interface IAuthLoginRes {
  success?: boolean;
  errors?: IAuthLoginErrors;
  user?: IUser;
}
