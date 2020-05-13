import { IArticle, IArticleFilter } from '~/interfaces';
import { config } from '../constants';
import SerializerService from '../services/seralizer';
import ImageService from '../services/image';
import ArticleModel from '../models/article';
import ArticleCategoryModel from '../models/article-category';
import { objectIdToString } from '../utils';

class ArticleService {
  public format(data: IArticle, full?: boolean): IArticle {
    let { content } = data;
    const json = JSON.parse(content);

    if (full) {
      content = SerializerService.serializeToHtml(json);
    } else {
      content = SerializerService.serializeToText(
        json,
        config.shortArticleLength,
      );
    }

    const image =
      data.hasImage &&
      ImageService.format(`/static/articles/${data._id}`, full);

    return {
      ...data,
      content,
      image,
      authorId: objectIdToString(data.authorId),
    };
  }

  public async find(filter: IArticleFilter = {}, full?: boolean) {
    const { page, category: categoryLabel, thumbnail } = filter;

    if (page <= 0) {
      throw new Error('Incorrect page!');
    }

    const limit = filter?.limit ?? config.articlesPerPage;
    const offset = page != null ? (page - 1) * limit : 0;

    let categoryId;

    if (categoryLabel) {
      const category = await ArticleCategoryModel.findOne({
        label: categoryLabel,
      })
        .lean()
        .exec();

      categoryId = category?._id;
    }

    const items: IArticle[] = await ArticleModel.find({
      ...(categoryId && { categoryId }),
      ...(thumbnail && { hasImage: thumbnail }),
    })
      .skip(offset)
      .limit(limit)
      .sort({ _id: -1 })
      .lean()
      .exec();

    return items.map((r) => this.format(r, full));
  }

  public async findOne(label: string, full?: boolean): Promise<IArticle> {
    if (!label) {
      throw new Error('Label must be provided!');
    }

    const data = await ArticleModel.findOne({ label }).lean().exec();

    if (!data) {
      throw new Error("Couldn't find the article!");
    }

    return this.format(data, full);
  }
}

export default new ArticleService();
