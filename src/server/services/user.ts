import { IUser } from '~/interfaces';
import db from '../models/db';
import { hashString } from '../utils';

export const createUser = async (data: IUser): Promise<IUser> => {
  const { password } = data;

  const hashedPassword = await hashString(password);

  const [id] = await db.client<IUser>('users').insert({
    ...data,
    password: hashedPassword,
  });

  return {
    ...data,
    id,
    password: undefined,
  };
};

export const findUser = async (username: string): Promise<IUser> => {
  const [item] = await db
    .client<IUser>('users')
    .where({ username })
    .limit(1);

  return item;
};

export const changeUserPassword = async (
  username: string,
  newPassword: string,
): Promise<Error> => {
  const user = await findUser(username);

  if (!user) return new Error('Użytkownik nie istnieje!');

  const hashed = await hashString(newPassword);

  await db
    .client<IUser>('users')
    .where({ username })
    .limit(1)
    .update({ password: hashed });

  return null;
};
