import { IUser } from '~/interfaces';

export const formatUser = (data: IUser): IUser => {
  return {
    ...data,
    password: undefined,
    image: `/static/users/${data.id}`,
  };
};
