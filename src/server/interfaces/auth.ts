import { IUser } from '~/interfaces';

export interface IAccessTokenPayload {
  type: 'ACCESS_TOKEN';
  user: IUser;
}
