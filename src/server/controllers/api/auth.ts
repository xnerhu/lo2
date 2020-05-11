import { FastifyInstance } from 'fastify';

import { config } from '~/server/constants';
import AuthService from '~/server/services/auth';
import UserService from '~/server/services/user';
import { IApiResponse, IUser } from '~/interfaces';
import { IRequest } from '~/server/interfaces';
import { signedOutUser } from '~/server/utils';

export default (app: FastifyInstance, opts: any, next: Function) => {
  app.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;

    const { token, user } = await AuthService.authenticateUser(
      username,
      password,
    );
    const currentTime = new Date().getTime();

    res.setCookie('token', token, {
      expires: new Date(currentTime + config.tokenExpirationTime),
      httpOnly: true,
      // secure: true,
    });

    return res.send({
      success: true,
      user: UserService.format(user),
    } as IApiResponse<IUser>);
  });

  app.get('/sign-out', (req, res) => {
    signedOutUser(res);
    res.redirect('/');
  });

  app.get('/signed-in', (req: IRequest, res) => {
    res.send({ success: !!req.raw.tokenPayload } as IApiResponse);
  });

  next();
};
