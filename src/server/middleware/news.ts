import { Response, NextFunction } from 'express';

import { IRequest } from '../interfaces';
import { IAddArticleReq, IAddArticleRes, INewsCategory } from '~/interfaces';
import { serializeRichText } from '../utils';
import { findCategory } from '../services';

export const withAddArticleProps = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const { title, content, categoryLabel } = req.body as IAddArticleReq;
  const data: IAddArticleRes = { success: false, errors: {} };
  let category: INewsCategory;

  if (req.file && !req.file.mimetype.startsWith('image')) {
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

  req.addArticle = {
    title,
    body: content,
    categoryId: category.id,
    authorId: req.user.id,
    image: req.file,
  };

  return next();
};

export const withEditArticleProps = (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const { deleteImage, label } = req.body;

  req.editArticle = {
    ...req.addArticle,
    deleteImage: deleteImage != null && deleteImage !== 'false',
    label,
  };

  req.addArticle = undefined;

  next();
};
