import {
  IArticlesPageData,
  IArticleFilter,
  IArticlesChunk,
  IArticle,
  IUser,
} from '~/interfaces';
import ArticleService from '../services/article';
import ArticleCategoryModel from '../models/article-category';
import { getUniqueValues } from '../utils';
import { config } from '../constants';
import UserModel from '../models/user';
import UserService from '../services/user';
import ArticleCategoryService from '../services/article-category';

const getChunk = async (filter: IArticleFilter): Promise<IArticlesChunk> => {
  let articles: IArticle[] = [];
  let users: IUser[] = [];

  articles = await ArticleService.find(filter, true);

  const ids = getUniqueValues(articles.map((r) => r.authorId));

  users = await UserModel.find({
    _id: {
      $in: ids,
    },
  })
    .lean()
    .exec();

  return {
    articles,
    users: users.map((r) => UserService.format(r)),
    nextPage: articles.length >= config.articlesPerPage,
  };
};

export default async (filter: IArticleFilter): Promise<IArticlesPageData> => {
  const [chunk, categories] = await Promise.all([
    getChunk(filter),
    ArticleCategoryService.getAll(),
  ]);

  return {
    ...chunk,
    categories,
  };
};
