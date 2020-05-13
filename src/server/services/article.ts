import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import { resolve } from 'path';

import { IArticle, IArticleFilter } from '~/interfaces';
import { config } from '../constants';
import SerializerService from '../services/seralizer';
import ImageService from '../services/image';
import ArticleModel from '../models/article';
import ArticleCategoryModel from '../models/article-category';
import { objectIdToString, formatLabel, createRandLabel } from '../utils';
import { IInsertArticle } from '~/interfaces';
import { serializeToText } from '~/utils/serializer';

class ArticleService {
  public format(data: IArticle, full?: boolean): IArticle {
    let { content } = data;
    const json = JSON.parse(content);

    if (full) {
      content = SerializerService.serializeToHtml(json);
    } else {
      content = serializeToText(json, config.shortArticleLength);
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

  private async createLabel(title: string): Promise<string> {
    let label = formatLabel(title);

    const exists = await ArticleModel.exists({ label });

    if (exists) {
      label = createRandLabel(label);
    }

    return label;
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

  public async insertOne({
    title,
    content,
    image,
    authorId,
    category: categoryLabel,
  }: IInsertArticle): Promise<string> {
    const [label, category] = await Promise.all([
      this.createLabel(title),
      ArticleCategoryModel.findOne({ label: categoryLabel }).lean().exec(),
    ]);

    const res = await ArticleModel.create({
      label,
      title,
      content,
      authorId: new mongoose.Types.ObjectId(authorId) as any,
      categoryId: category._id,
      hasImage: !!image,
    } as IArticle);

    if (image) {
      const path = resolve(
        config.articleImagesPath,
        (res._id as ObjectID).toHexString(),
      );

      await ImageService.saveImage(image as Buffer, path);
    }

    return label;
  }
}

export default new ArticleService();
