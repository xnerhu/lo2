import { db } from '../models/db';
import {
  IArticleFilter,
  IArticle,
  IArticleCategory,
  IArticleListBundle,
} from '~/interfaces/article';
import ArticleCategoryService from './article-category';
import { formatArticleFull, formatArticleShort } from '../utils';

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

    return formatArticleFull(data.news);
  }

  public async findMany(filter: IArticleFilter = {}): Promise<IArticle[]> {
    const perPage = parseInt(process.env.POSTS_PER_PAGE);
    const { page, excluded, limit, category } = filter;

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
      query = query.where('news.categoryId', category);
    }

    const res = await query.select();
    const list = res.map((r) => formatArticleShort(r.news));

    return list;
  }

  public async bundleMany(filter: IArticleFilter): Promise<IArticleListBundle> {
    const perPage = parseInt(process.env.POSTS_PER_PAGE);
    const list = await this.findMany(filter);

    let categories: IArticleCategory[] = [];

    if (filter?.category) {
      const category = await ArticleCategoryService.find(filter.category);

      categories.push(category);
    } else {
      const set = new Set<number>(list.map((r) => r.categoryId));

      categories = await ArticleCategoryService.findManyById(...set);
    }

    return { articles: list, categories, nextPage: list.length >= perPage };
  }
}

export default new ArticleService();
