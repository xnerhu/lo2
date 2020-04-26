import { Router, Response } from 'express';

import AuthService from '~/server/services/auth';
import UserService from '~/server/services/user';
import {
  IAuthLoginRes,
  IChangePasswordReq,
  IChangePasswordRes,
} from '~/interfaces';
import { compareHashed, formatUser } from '~/server/utils';
import { ACCESS_TOKEN_EXPIRATION } from '~/server/constants';
import { withAuth } from '~/server/middleware/auth';
import { IRequest } from '~/server/interfaces';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const data: IAuthLoginRes = {
    success: false,
    errors: {},
  };

  if (!username.length || !password.length) {
    if (!username.length) {
      data.errors.username = 'Nazwa użytkownika nie może być pusta!';
    }

    if (!password.length) {
      data.errors.password = 'Hasło nie może być puste!';
    }

    return res.json(data);
  }

  const user = await UserService.find(username);

  const correctPassword =
    user && (await compareHashed(password, user.password));

  if (!user || !correctPassword) {
    data.errors.username = 'Zła nazwa użytkownika lub hasło';
    return res.json(data);
  }

  const token = AuthService.createToken(user);

  res.cookie('token', token, {
    maxAge: ACCESS_TOKEN_EXPIRATION - 60 * 1000,
    httpOnly: true,
  });

  return res.json({
    success: true,
    user: formatUser(user),
  } as IAuthLoginRes);
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

router.get('/logged', withAuth(), (req, res) => {
  res.send('success');
});

const logout = (res: Response) => {
  res.clearCookie('token');
};

router.post('/change-password', async (req: IRequest, res) => {
  const { password } = req.body as IChangePasswordReq;
  const { user } = await AuthService.verifyToken(req);

  if (!password.length) {
    return res.json({
      success: false,
      error: 'Hasło nie może być puste!',
    } as IChangePasswordRes);
  }

  let error;

  try {
    await UserService.changePassword(user.username, password);
  } catch (err) {
    error = err;
  }

  if (error) {
    if (error.message.startsWith('User')) {
      return res.json({
        success: false,
        error: error.message,
      } as IChangePasswordRes);
    } else {
      throw error;
    }
  }

  logout(res);

  return res.json({ success: true } as IChangePasswordRes);
});

export default router;
