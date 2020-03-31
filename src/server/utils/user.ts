import { IUser } from '~/interfaces';

export const formatUser = (data: IUser): IUser => ({
  ...data,
  image: `/static/users/${data.id}`,
  password: undefined,
});
