import { IArticleCategory } from '~/interfaces/article';
import { db } from '../models/db';

class ArticleCategoryService {
  public async find(label: string): Promise<IArticleCategory> {
    if (!label) {
      throw new Error('Label must be provided!');
    } else if (label === 'all') {
      throw new Error('Incorrect label!');
    }

    const [data] = await db<IArticleCategory>('news-categories')
      .where({ label })
      .limit(1);

    return data;
  }

  public async findMany(): Promise<IArticleCategory[]> {
    const items = await db<IArticleCategory>('news-categories');

    return items;
  }

  public async findManyById(...ids: number[]): Promise<IArticleCategory[]> {
    const items = await db<IArticleCategory>('news-categories').whereIn(
      'id',
      ids,
    );

    return items;
  }
}

export default new ArticleCategoryService();
