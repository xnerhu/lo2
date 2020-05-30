import { FastifyInstance } from 'fastify';

import useAuth from '../middleware/auth';
import { IRequest } from '~/server/interfaces';
import {
  IInsertArticleRes,
  IInsertArticle,
  IEditArticle,
  IArticle,
  IUser,
  IApiResponse,
} from '~/interfaces';
import ArticleCategory from '~/server/models/article-category';
import ArticleModel from '~/server/models/article';
import ArticleService from '~/server/services/article';
import { serializeToText } from '~/utils/serializer';
import { config } from '~/server/constants';
import { isImage, getFirstArrayItem } from '~/server/utils';

const articleRequestOptions = {
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
};

const verifyArticleRequest = async (req: IRequest) => {
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

  if (!title) {
    throw new Error('Title needs to be provided!');
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

  return [image, user];
};

const ensurePermissions = async (label: string, user: IUser, select = '*') => {
  let article: IArticle;

  if (!label) {
    throw new Error('Label needs to be provided!');
  } else {
    article = await ArticleModel.findOne({
      label,
    })
      .select((select || '') + ' authorId')
      .lean()
      .exec();

    if (!article) {
      throw new Error(`Article with label ${label} doesn\'t exists!`);
    }
  }

  if (!ArticleService.canEdit(article, user)) {
    throw new Error('Access forbidden!');
  }

  return article;
};

export default (app: FastifyInstance, opts: any, next: Function) => {
  app.post('/', articleRequestOptions, async (req: IRequest, res) => {
    const [image, user] = await verifyArticleRequest(req);
    const { title, content, category } = req.body as IInsertArticle;

    const label = await ArticleService.insertOne({
      title,
      content,
      category,
      authorId: user._id,
      image: image?.data,
    });

    return { success: true, label } as IInsertArticleRes;
  });

  app.patch('/:label', articleRequestOptions, async (req: IRequest, res) => {
    const [image, user] = await verifyArticleRequest(req);

    const { label } = req.params;
    const article = await ensurePermissions(label, user, 'hasImage');

    const { title, content, category, deleteImage } = req.body as IEditArticle;

    await ArticleService.updateOne({
      _id: article._id.toString(),
      title,
      content,
      category,
      image: image?.data,
      deleteImage: (deleteImage as any) === 'true',
      hasImage: article.hasImage,
    });

    return { success: true, label } as IInsertArticleRes;
  });

  app.delete(
    '/:label',
    { preValidation: useAuth() },
    async (req: IRequest, res) => {
      const { label } = req.params;

      const article = await ensurePermissions(
        label,
        req.raw.tokenPayload,
        null,
      );

      await ArticleService.delete(article._id);

      return { success: true } as IApiResponse;
    },
  );

  next();
};
