import { FastifyInstance } from 'fastify';

import useAuth from '../middleware/auth';
import { IRequest } from '~/server/interfaces';
import { IInsertArticleRes } from '~/interfaces';
import ArticleCategory from '~/server/models/article-category';
import ArticleService from '~/server/services/article';
import { serializeToText } from '~/utils/serializer';
import { config } from '~/server/constants';
import { isImage, getFirstArrayItem } from '~/server/utils';

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

      if (files instanceof Array) {
        if (files.length > 1) {
          throw new Error('Only one image is supported!');
        }

        files.forEach((r) => {
          if (!isImage(r)) {
            throw new Error(`File type ${r.mimetype} is not supported!`);
          }

          if (r?.limit) {
            throw new Error(
              `Too big file! Size must be less than ${config.maxImageUploadSize} bytes!`,
            );
          }
        });
      }

      const image = getFirstArrayItem(files);

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
        image: image?.data,
      });

      return { success: true, label } as IInsertArticleRes;
    },
  );

  next();
};
