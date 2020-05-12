import { ObjectId } from 'mongodb';

export const objectIdToString = (obj: any) => {
  return (obj as ObjectId).toHexString();
};
