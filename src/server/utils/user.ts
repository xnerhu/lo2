import { IUser } from '~/interfaces';

export const formatUser = ({ firstName, lastName, id }: IUser): IUser => ({
  id,
  firstName,
  lastName,
  image: `/static/users/${id}`,
});
