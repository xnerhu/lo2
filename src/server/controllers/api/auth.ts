import { FastifyInstance } from 'fastify';

import { config } from '~/server/constants';
import AuthService from '~/server/services/auth';
import UserService from '~/server/services/user';
import { IApiResponse, IUser } from '~/interfaces';
import { IRequest } from '~/server/interfaces';
import { signOutUser } from '~/server/utils';

export default (app: FastifyInstance, opts: any, next: Function) => {
  app.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;

    const { token, user } = await AuthService.authenticateUser(
      username,
      password,
    );
    const currentTime = new Date().getTime();

    signOutUser(res);

    res.setCookie('token', token, {
      expires: new Date(currentTime + config.tokenExpirationTime),
      path: '/',
      httpOnly: true,
    });

    return {
      success: true,
      user: UserService.format(user),
    } as IApiResponse<IUser>;
  });

  app.get('/sign-out', (req, res) => {
    signOutUser(res);
    res.redirect('/');
  });

  app.get('/signed-in', (req: IRequest, res) => {
    res.send({ success: !!req.raw.tokenPayload } as IApiResponse);
  });

  next();
};
