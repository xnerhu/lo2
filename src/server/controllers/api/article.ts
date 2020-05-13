import { FastifyInstance } from 'fastify';

import useAuth from '../middleware/auth';
import UserService from '~/server/services/user';
import { verifyUser, signOutUser } from '~/server/utils';
import { IRequest, IInsertArticle } from '~/server/interfaces';
import { IInsertArticleRes } from '~/interfaces';
import ArticleCategory from '~/server/models/article-category';
import ArticleService from '~/server/services/article';
import { serializeToText } from '~/utils/serializer';

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

      const serialized = serializeToText(content);

      if (!serialized.trim().length) {
        throw new Error('Content must be provided!');
      }

      const label = await ArticleService.insertOne({
        title,
        content,
        category,
        authorId: user._id,
        image: null,
      });

      res.send({ success: true, label } as IInsertArticleRes);
    },
  );

  next();
};
