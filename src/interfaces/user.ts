export interface IUser {
  id?: number;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  createdAt?: string;
  image?: string;
  admin?: boolean;
}

export interface IChangePasswordReq {
  password?: string;
}

export interface IChangePasswordRes {
  success?: boolean;
  error?: string;
}
