import { listFiles, formatUser, IParams } from '../utils';
import ArticleService from '../services/article';
import ArticleCategoryService from '../services/article-category';
import UserService from '../services/user';
import {
  IHomePageData,
  INewsPageData,
  IArticlePagePacket,
  IUser,
} from '~/interfaces';
import { IArticle } from '~/interfaces/article';
import { createArticleFilter } from '~/utils/article';
import { IRequest } from '../interfaces';

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
}

const isArticleEditable = (article: IArticle, user: IUser) => {
  if (!article) return false;
  if (!user) return false;
  if (user.admin) return true;

  return user.id === article.authorId;
};

export default new PageService();
