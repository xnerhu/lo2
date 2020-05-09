import { hash, compare } from 'bcryptjs';

export const hashString = (value: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    hash(value, 10, (err, encrypted) => {
      if (err) return reject(err);
      resolve(encrypted);
    });
  });
};

export const compareHashed = (
  value: string,
  hashedValue: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    compare(value, hashedValue, (err, same) => {
      if (err) return reject(err);
      resolve(same);
    });
  });
};
