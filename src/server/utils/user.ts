import { IUser } from '~/interfaces';

export const formatUser = ({
  firstName,
  lastName,
  id,
  admin,
}: IUser): IUser => ({
  id,
  firstName,
  lastName,
  admin,
  image: `/static/users/${id}`,
});
