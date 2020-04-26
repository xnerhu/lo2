import { promises as fs } from 'fs';
import { resolve } from 'path';
import { Response } from 'express';

import { listFiles, formatUser, IParams } from '../utils';
import ArticleService from '../services/article';
import ArticleCategoryService from '../services/article-category';
import UserService from '../services/user';
import {
  IHomePageData,
  INewsPageData,
  IArticlePagePacket,
  IUser,
  IPersonnelPacket,
  IAddArticlePacket,
  IEditArticlePacket,
} from '~/interfaces';
import { IArticle } from '~/interfaces/article';
import { createArticleFilter } from '~/utils/article';
import { IRequest } from '../interfaces';
import AuthService from '~/server/services/auth';

class PageService {
  public async getHomeData(): Promise<IHomePageData> {
    const maxArticleLength = parseInt(process.env.HOME_PAGE_ARTICLE_LENGTH);

    const [sliderItems, articles] = await Promise.all([
      listFiles('home-slider'),
      ArticleService.findMany(
        { limit: 9, thumbnail: true },
        { maxLength: maxArticleLength },
      ),
    ]);

    return {
      sliderItems,
      articles,
    };
  }

  public async getNewsData(params: IParams): Promise<INewsPageData> {
    const filter = createArticleFilter(params);

    const [chunk, categories] = await Promise.all([
      ArticleService.chunk(filter),
      ArticleCategoryService.findMany(),
    ]);

    return {
      ...chunk,
      categories,
    };
  }

  public async getArticleData(
    { label }: IParams,
    req: IRequest,
  ): Promise<IArticlePagePacket> {
    try {
      const article = await ArticleService.find(label);

      const [category, author] = await Promise.all([
        ArticleCategoryService.findById(article.categoryId),
        UserService.findById(article.authorId),
      ]);

      return {
        article,
        category,
        author: formatUser(author),
        editable: isArticleEditable(article, req.user),
      };
    } catch (error) {
      return { error: true };
    }
  }

  public async getPersonnelData(): Promise<IPersonnelPacket> {
    const [sliderItems, sections] = await Promise.all([
      listFiles('personnel-slider'),
      fs.readFile(resolve('static', 'personnel.json')),
    ]);

    return { sliderItems, sections: JSON.parse(sections as any) };
  }

  public async getAddArticlePacket(): Promise<IAddArticlePacket> {
    const categories = await ArticleCategoryService.findMany();

    return { categories };
  }

  public async getEditArticlePacket(
    params: IParams,
    req: IRequest,
    res: Response,
  ): Promise<IEditArticlePacket> {
    const { label } = params;
    const { user } = await AuthService.verifyToken(req);

    if (!user) {
      return res.redirect('/login');
    }

    const [article] = await Promise.all([
      // getNewsCategories(),
      ArticleService.getPlainArtice(label),
    ]);

    const editable = isArticleEditable(article, user);
    let error = '';

    if (!article) {
      error = 'Nie znaleziono artykułu!';
    } else if (!editable) {
      error = 'Nie masz uprawnień, aby móc edytować ten artykuł!';
    }

    return {
      label,
      item: editable && {
        title: article.title,
        categoryLabel: article._category.label,
        content: article.content,
        image: formatArticleImage(article),
      },
      success: editable,
      error,
    };
  }
}

const isArticleEditable = (article: IArticle, user: IUser) => {
  if (!article) return false;
  if (!user) return false;
  if (user.admin) return true;

  return user.id === article.authorId;
};

const formatArticleImage = (data: IArticle, full?: boolean) => {
  return data.hasImage
    ? `/static/news/${data.id}${!full ? '.thumbnail' : ''}`
    : undefined;
};

export default new PageService();
