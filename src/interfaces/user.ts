import { ObjectID } from 'mongodb';

export interface IUser {
  _id?: ObjectID;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  image?: string;
  admin?: boolean;
  createdAt?: string;
}
