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
  let author: IUser;

  try {
    article = await ArticleService.findOne(label, true);

    const [_category, _author] = await Promise.all([
      ArticleCategoryModel.findOne({ _id: article.categoryId }).lean().exec(),
      UserModel.findOne({ _id: article.authorId }).lean().exec(),
    ]);

    category = _category;
    author = _author;
  } catch (error) {
    console.log(error);
  }

  const exists = article != null;

  return {
    article,
    category,
    author: exists && UserService.format(author),
    canEdit: exists && user?._id === article?._id?.toString(),
    success: exists,
  };
};
