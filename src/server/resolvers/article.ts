import {
  IArticlePageData,
  IUser,
  IArticle,
  IArticleCategory,
} from '~/interfaces';
import ArticleService from '../services/article';
import ArticleCategoryModel from '../models/article-category';
import UserModel from '../models/user';
import UserService from '../services/user';

export default async (
  label: string,
  user: IUser,
): Promise<IArticlePageData> => {
  let article: IArticle;
  let category: IArticleCategory;
  let subcategory: IArticleCategory;
  let author: IUser;

  try {
    article = await ArticleService.findOne(label, true);

    const [_category, _subcategory, _author] = await Promise.all([
      ArticleCategoryModel.findOne({ _id: article.categoryId }).lean().exec(),
      article.subcategoryId &&
        ArticleCategoryModel.findOne({ _id: article.subcategoryId })
          .lean()
          .exec(),
      UserModel.findOne({ _id: article.authorId }).lean().exec(),
    ]);

    category = _category;
    subcategory = _subcategory;
    author = _author;
  } catch (err) {}

  const exists = article != null;

  return {
    article,
    category,
    subcategory,
    author: exists && UserService.format(author),
    canEdit: ArticleService.canEdit(article, user),
    success: exists,
  };
};
