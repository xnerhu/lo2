import { Router } from 'express';
import multer from 'multer';

import { formatNewsFilter } from '~/utils';
import { IAddArticleRes, IDeleteArticleRes } from '~/interfaces';
import {
  withAuth,
  withAuthNoError,
  withAddArticleProps,
  withEditArticleProps,
} from '~/server/middleware';
import { IRequest } from '~/server/interfaces';
import {
  getNewsChunk,
  getArticlePagePacket,
  insertArticle,
  getEditArticlePacket,
  getNewsCategories,
  editArticle,
  deleteArticle,
} from '~/server/services';

const upload = multer();

const router = Router();

router.get('/news', async (req, res) => {
  const filter = formatNewsFilter(req.query);
  const data = await getNewsChunk(filter);

  res.json(data);
});

router.get('/news-categories', async (req, res) => {
  const data = await getNewsCategories();

  res.json(data);
});

router.get('/article', withAuthNoError, async (req: IRequest, res) => {
  const data = await getArticlePagePacket(req.query.label, req.user);

  res.json(data);
});

router.get('/edit-article', withAuthNoError, async (req: IRequest, res) => {
  const data = await getEditArticlePacket(req.query.label, req.user);

  res.json(data);
});

router.put(
  '/add-article',
  withAuth(),
  upload.single('image'),
  withAddArticleProps,
  async (req: IRequest, res) => {
    const data = await insertArticle(req.addArticle);

    return res.json({ success: true, articleLabel: data } as IAddArticleRes);
  },
);

router.put(
  '/edit-article',
  withAuth(),
  upload.single('image'),
  withAddArticleProps,
  withEditArticleProps,
  async (req: IRequest, res) => {
    const data = await editArticle(req.editArticle);

    if (typeof data !== 'string') {
      return res.json({ success: false, errors: data } as IAddArticleRes);
    }

    return res.json({
      success: true,
      articleLabel: data,
    } as IAddArticleRes);
  },
);

router.post('/delete-article', withAuth(), async (req: IRequest, res) => {
  const { label } = req.body;
  const data = await deleteArticle(label);

  if (data instanceof Error) {
    return res.json({ success: false, error: data.message });
  }

  return res.json({ success: true });
});

export default router;
