import { IUser } from '~/interfaces';

export const formatUser = (data: IUser): IUser => {
  return {
    ...data,
    image: `/static/users/${data._id}`,
  };
}
