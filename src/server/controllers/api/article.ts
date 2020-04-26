import { Router } from 'express';
import multer from 'multer';

import ArticleService from '../../services/article';
import { handleRoute } from '~/server/utils';
import { createArticleFilter } from '~/utils/article';
import { withAuth } from '~/server/middleware/auth';
import {
  withAddArticleProps,
  withEditArticleProps,
} from '~/server/middleware/article';
import { IRequest } from '~/server/interfaces';
import { IAddArticleRes } from '~/interfaces';

const router = Router();

const upload = multer();

router.get(
  '/list',
  handleRoute((query) => {
    const filter = createArticleFilter(query);

    return ArticleService.chunk(filter);
  }),
);

router.put(
  '/add',
  withAuth(),
  upload.single('image'),
  withAddArticleProps,
  async (req: IRequest, res) => {
    const data = await ArticleService.insert(req.addArticle);

    return res.json({ success: true, articleLabel: data } as IAddArticleRes);
  },
);

router.put(
  '/edit',
  withAuth(),
  upload.single('image'),
  withAddArticleProps,
  withEditArticleProps,
  async (req: IRequest, res) => {
    const data = await ArticleService.editArticle(req.editArticle);

    if (typeof data !== 'string') {
      return res.json({ success: false, errors: data } as IAddArticleRes);
    }

    return res.json({
      success: true,
      articleLabel: data,
    } as IAddArticleRes);
  },
);

router.post('/delete', withAuth(), async (req: IRequest, res) => {
  const { label } = req.body;
  const data = await ArticleService.delete(label);

  if (data instanceof Error) {
    return res.json({ success: false, error: data.message });
  }

  return res.json({ success: true });
});

export default router;
