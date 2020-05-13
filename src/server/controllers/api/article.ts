import { FastifyInstance } from 'fastify';

import useAuth from '../middleware/auth';
import UserService from '~/server/services/user';
import { verifyUser, signOutUser } from '~/server/utils';
import { IRequest } from '~/server/interfaces';
import { IApiResponse } from '~/interfaces';
import ArticleCategory from '~/server/models/article-category';
import ArticleService from '~/server/services/article';

export default (app: FastifyInstance, opts: any, next: Function) => {
  app.put(
    '/',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            category: { type: 'string' },
          },
          required: ['title', 'content', 'category'],
        },
      },
      preValidation: useAuth(),
    },
    async (req: IRequest, res) => {
      const { title, content, category } = req.body;
      const user = req.raw.tokenPayload;

      const categoryExists = await ArticleCategory.exists({ label: category });

      if (!categoryExists) {
        throw new Error(`Category ${category} doesn\'t exists!`);
      }

      const label = await ArticleService.insertOne({
        title,
        content,
        category,
        authorId: user._id,
      });

      res.send({ success: true });
      // const { username, password } = req.body ?? {};

      // verifyUser(req, username);

      // await UserService.changePassword(username, password);

      // signOutUser(res);

      // res.send({ success: true } as IApiResponse);
    },
  );

  next();
};
