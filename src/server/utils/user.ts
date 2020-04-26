import { IUser } from '~/interfaces';

export const formatUser = ({
  firstName,
  lastName,
  username,
  id,
  admin,
}: IUser): IUser => ({
  id,
  username,
  firstName,
  lastName,
  admin,
  image: `/static/users/${id}`,
});
