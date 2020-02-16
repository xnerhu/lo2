import { Router } from 'express';

import { IRequest } from '~/server/interfaces';
import { withAuth } from '~/server/middleware';
import { IChangePasswordReq, IChangePasswordRes } from '~/interfaces';
import { changeUserPassword } from '~/server/services/user';
import { logout } from '~/server/utils';

const router = Router();

router.post('/change-password', withAuth(), async (req: IRequest, res) => {
  const { password } = req.body as IChangePasswordReq;

  if (!password.length) {
    return res.json({
      success: false,
      error: 'Hasło nie może być puste!',
    } as IChangePasswordRes);
  }

  const error = await changeUserPassword(req.user.username, password);

  if (error) {
    return res.json({
      success: false,
      error: error.message,
    } as IChangePasswordRes);
  }

  logout(res);

  return res.json({ success: true } as IChangePasswordRes);
});

export default router;
