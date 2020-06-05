import { IArticleCategory } from '~/interfaces';
import ArticleCategoryModel from '../models/article-category';

class ArticleCategoryService {
  public format(data: IArticleCategory): IArticleCategory {
    if (!data) return null;

    return {
      ...data,
      _id: data._id.toString(),
      subcategoryRef: data.subcategoryRef?.toString(),
    };
  }

  public async getAll(): Promise<IArticleCategory[]> {
    const items = await ArticleCategoryModel.find().lean().exec();

    return items.map((r) => this.format(r));
  }
}

export default new ArticleCategoryService();
