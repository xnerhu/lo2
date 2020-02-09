import { Router } from 'express';
import multer from 'multer';

import { formatNewsFilter } from '~/utils';
import { IAddArticleReq, IAddArticleRes, INewsCategory } from '~/interfaces';
import { withAuth, withAuthNoError } from '~/server/middleware';
import { serializeRichText } from '~/server/utils';
import { IRequest } from '~/server/interfaces';
import {
  getNewsChunk,
  getNewsCategories,
  getArticlePagePacket,
  findCategory,
  insertArticle,
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

router.put(
  '/add-article',
  withAuth(),
  upload.single('image'),
  async (req: IRequest, res) => {
    const { title, content, categoryLabel } = req.body as IAddArticleReq;
    const data: IAddArticleRes = { success: false, errors: {} };
    let category: INewsCategory;

    if (req.file && !req.file.mimetype.startsWith('/image')) {
      data.errors.image = 'Nie poprawny format zdjęcia!';
    }

    if (!title) {
      data.errors.title = 'Tytuł nie może być pusty!';
    } else if (title.length > 128) {
      data.errors.title = 'Tytuł nie może przekraczać 128 znaków!';
    }

    try {
      if (content.length > 65536) {
        data.errors.content = 'Treść jest za długa!';
      } else {
        const text = serializeRichText(JSON.parse(content));

        if (!text.length) {
          data.errors.content = 'Treść nie może być pusta!';
        }
      }
    } catch (error) {
      data.errors.content = 'Nie poprawny format treści!';
    }

    if (!categoryLabel) {
      data.errors.category = 'Nie podano kategorii!';
    } else {
      category = await findCategory(categoryLabel);

      if (!category) {
        data.errors.category = 'Nie poprawna kategoria!';
      }
    }

    if (Object.keys(data.errors).length > 0) {
      return res.json(data);
    }

    const articleLabel = await insertArticle({
      title,
      body: content,
      categoryId: category.id,
      authorId: req.user.id,
      image: req.file,
    });

    return res.json({ success: true, articleLabel } as IAddArticleRes);
  },
);

export default router;
