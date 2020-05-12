import axios from 'axios';

import { IApiResponse } from '~/interfaces';

export const signIn = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<IApiResponse> => {
  try {
    const res = await axios.post<IApiResponse>('/api/auth/sign-in', {
      username,
      password,
    });

    return res.data;
  } catch (error) {
    return { success: false };
  }
};
