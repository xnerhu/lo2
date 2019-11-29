import db from '~/server/models/db';
import { IUser } from '~/interfaces';

export const getUserData = async (_id: number): Promise<IUser> => {
  if (!Number.isInteger(_id)) return {};

  const data = await db.users.findOne({ _id });

  return { ...data, password: undefined };
}
