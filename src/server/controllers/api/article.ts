import { FastifyInstance } from 'fastify';

import useAuth from '../middleware/auth';
import { IRequest } from '~/server/interfaces';
import { IInsertArticleRes } from '~/interfaces';
import ArticleCategory from '~/server/models/article-category';
import ArticleService from '~/server/services/article';
import { serializeToText } from '~/utils/serializer';
import { config } from '~/server/constants';

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
      if (!req.isMultipart()) {
        throw new Error('Request is not multipart!');
      }

      const { title, content, category, image: files } = req.body;
      const image = files && files[0];

      if (files instanceof Array && files.length > 1) {
        throw new Error('Only one image is supported!');
      }

      if (image?.limit) {
        throw new Error(
          `Image size must be less than ${config.maxImageUploadSize} bytes!`,
        );
      }

      if (image && !image.mimetype.startsWith('image')) {
        throw new Error(`File type ${image.mimetype} is not supported!`);
      }

      const user = req.raw.tokenPayload;

      const categoryExists = await ArticleCategory.exists({ label: category });

      if (!categoryExists) {
        throw new Error(`Category ${category} doesn\'t exists!`);
      }

      const serialized = serializeToText(JSON.parse(content));

      if (!serialized.trim().length) {
        throw new Error('Content must be provided!');
      }

      const label = await ArticleService.insertOne({
        title,
        content,
        category,
        authorId: user._id,
        image: image?.data as Buffer,
      });

      return { success: true, label } as IInsertArticleRes;
    },
  );

  next();
};
