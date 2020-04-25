import { db } from '../models/db';
import {
  IArticleFilter,
  IArticle,
  IArticleListChunk,
} from '~/interfaces/article';
import ArticleCategoryService from './article-category';
import { getUniqueValues, IArticleFormat, formatArticle } from '../utils';
import UserService from './user';

class ArticleService {
  public async find(label: string): Promise<IArticle> {
    if (!label) {
      throw new Error('Label must be provided!');
    }

    const query = db<IArticle>('news')
      .where('news.label', label)
      .limit(1)
      .leftJoin('news-categories', {
        'news.categoryId': 'news-categories.id',
      })
      .leftJoin('users', {
        'news.authorId': 'users.id',
      })
      .options({ nestTables: true });

    const [data] = await query.select();

    if (!data) {
      throw new Error("Can't find the article.");
    }

    return formatArticle(data.news, { content: 'html', image: 'full' });
  }

  public async findMany(
    filter: IArticleFilter = {},
    format?: IArticleFormat,
  ): Promise<IArticle[]> {
    const perPage = parseInt(process.env.ARTICLES_PAGE_ARTICLE_COUNT);
    const { page, excluded, limit, category, thumbnail } = filter;

    if (page <= 0) {
      throw new Error('Incorrect page!');
    }

    const offset = page != null ? (page - 1) * perPage : 0;

    let query = db<IArticle>('news')
      .orderBy('news.id', 'desc')
      .offset(offset)
      .limit(limit || perPage)
      .options({ nestTables: true });

    if (excluded) {
      query = query.whereNot('news.label', excluded);
    }

    if (category) {
      const { id } = await ArticleCategoryService.find(category);

      query = query.where('news.categoryId', id);
    }

    if (thumbnail) {
      query = query.where('news.hasImage', true);
    }

    const res = await query.select();

    return res.map((r) => formatArticle(r.news, format));
  }

  public async chunk(filter: IArticleFilter): Promise<IArticleListChunk> {
    const count = parseInt(process.env.ARTICLES_PAGE_ARTICLE_COUNT);
    const maxLength = parseInt(process.env.ARTICLES_PAGE_ARTICLE_LENGTH);

    const articles = await this.findMany(filter, { maxLength });
    const usersId = getUniqueValues(articles.map((r) => r.authorId));
    const users = await UserService.findMany(usersId);

    return { articles, users, nextPage: articles.length >= count };
  }
}

export default new ArticleService();
