import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import { resolve } from 'path';

import { IArticle, IArticleFilter, IEditArticle, IUser } from '~/interfaces';
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
    const { authorId } = data;
    let { content } = data;

    const json = JSON.parse(content);

    if (full) {
      content = SerializerService.serializeToHtml(json);
    } else {
      content = serializeToText(json, config.shortArticleLength);
    }

    return {
      ...data,
      content,
      image: this.formatImage(data, full),
      authorId: objectIdToString(authorId),
    };
  }

  public formatImage(data: IArticle, full?: boolean) {
    if (!data?.hasImage) return null;

    const { _id } = data;
    const basePath = `/static/articles/${_id}`;

    return ImageService.format(basePath, full ? 'normal' : 'thumbnail');
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
    const {
      page,
      category: categoryLabel,
      subcategory: subcategoryLabel,
      thumbnail,
    } = filter;

    if (page <= 0) {
      throw new Error('Incorrect page!');
    }

    const limit = filter?.limit ?? config.articlesPerPage;
    const offset = page != null ? (page - 1) * limit : 0;

    let categoryId;
    let subcategoryId;

    if (categoryLabel) {
      const category = await ArticleCategoryModel.findOne({
        label: categoryLabel,
      })
        .lean()
        .exec();

      categoryId = category?._id;
    }

    if (subcategoryLabel) {
      const subcategory = await ArticleCategoryModel.findOne({
        label: subcategoryLabel,
        subcategory: true,
      })
        .lean()
        .exec();

      subcategoryId = subcategory?._id;
    }

    const items: IArticle[] = await ArticleModel.find({
      ...(categoryId && { categoryId }),
      ...(subcategoryId && { subcategoryId }),
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

  private async saveImage(image: any, _id: ObjectID | string) {
    if (image instanceof Buffer) {
      let id: string;

      if (typeof _id === 'string') {
        id = _id;
      } else {
        id = _id.toHexString();
      }

      const path = resolve(config.articleImagesPath, id);

      await ImageService.saveImage(image, path, 'thumbnail', 'normal');
    }
  }

  public async deleteImages(_id: ObjectID | string) {
    const path = resolve(config.articleImagesPath, _id.toString());

    await ImageService.deleteImages(path);
  }

  public async insertOne({
    title,
    content,
    image,
    authorId,
    category: categoryLabel,
    subcategory: subcategoryLabel,
  }: IInsertArticle): Promise<string> {
    const [label, [category, subcategory]] = await Promise.all([
      this.createLabel(title),
      this.getCategories(categoryLabel, subcategoryLabel),
    ]);

    const res = await ArticleModel.create({
      label,
      title,
      content,
      authorId: new mongoose.Types.ObjectId(authorId) as any,
      categoryId: category._id,
      subcategoryId: subcategory?._id,
      hasImage: !!image,
    } as IArticle);

    await this.saveImage(image, res._id);

    return label;
  }

  private async getCategories(categoryLabel: string, subcategoryLabel: string) {
    return await Promise.all([
      ArticleCategoryModel.findOne({ label: categoryLabel }).lean().exec(),
      subcategoryLabel &&
        ArticleCategoryModel.findOne({
          label: subcategoryLabel,
          subcategory: true,
        }),
    ]);
  }

  public async updateOne({
    _id,
    title,
    content,
    category: categoryLabel,
    subcategory: subcategoryLabel,
    image,
    deleteImage,
    hasImage,
  }: IEditArticle) {
    const [category, subcategory] = await this.getCategories(
      categoryLabel,
      subcategoryLabel,
    );

    await ArticleModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(_id) as any,
      },
      {
        $set: {
          title,
          content,
          categoryId: category._id,
          subcategoryId: subcategory?._id,
          hasImage: (!deleteImage && hasImage) || !!image,
        },
      },
    )
      .lean()
      .exec();

    if (deleteImage || image) {
      await this.deleteImages(_id);
    }

    await this.saveImage(image, _id);
  }

  public canEdit(article: IArticle, user: IUser) {
    return (
      article &&
      user &&
      (user.admin || article.authorId.toString() === user._id.toString())
    );
  }

  public async delete(_id: string) {
    await ArticleModel.deleteOne({
      _id: new mongoose.Types.ObjectId(_id) as any,
    })
      .lean()
      .exec();

    await this.deleteImages(_id);
  }
}

export default new ArticleService();
