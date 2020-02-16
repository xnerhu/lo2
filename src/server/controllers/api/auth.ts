import { Router } from 'express';

import { createUser, findUser } from '~/server/services/user';
import { withAuth } from '~/server/middleware';
import { IAuthLoginRes } from '~/interfaces';
import { compareHashed, generateAccessToken, formatUser } from '~/server/utils';
import { ACCESS_TOKEN_EXPIRATION } from '~/server/constants';

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

  const user = await findUser(username);

  const correctPassword =
    user && (await compareHashed(password, user.password));

  if (!user || !correctPassword) {
    data.errors.username = 'Zła nazwa użytkownika lub hasło';
    return res.json(data);
  }

  const token = generateAccessToken(user);

  res.cookie('token', token, {
    maxAge: ACCESS_TOKEN_EXPIRATION - 60 * 1000,
    httpOnly: true,
  });

  return res.json({
    success: true,
    user: formatUser(user),
  } as IAuthLoginRes);
});

router.post('/register', async (req, res) => {
  await createUser({
    firstName: 'jan',
    lastName: 'kowal',
    username: 'xd',
    password: 'aha123',
  });

  res.json({});
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

router.get('/logged', withAuth(), (req, res) => {
  res.send('success');
});

export default router;
