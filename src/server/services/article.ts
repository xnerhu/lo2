import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

import { IArticle, IArticleFilter, IUser, IArticlesChunk } from '~/interfaces';
import { config } from '../constants';
import SerializerService from '../services/seralizer';
import ImageService from '../services/image';
import ArticleModel from '../models/article';
import UserModel from '../models/user';
import ArticleCategoryModel from '../models/article-category';
import { getUniqueValues } from '../utils';

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
      ImageService.format(`/static/articles/${data._id.toHexString()}`, full);

    return {
      ...data,
      content,
      image,
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

  public async getChunk(filter: IArticleFilter): Promise<IArticlesChunk> {
    let articles: IArticle[] = [];
    let users: IUser[] = [];

    try {
      articles = await this.find(filter);

      const ids = getUniqueValues(articles.map((r) => r.authorId));

      users = await UserModel.find({
        _id: {
          $in: ids,
        },
      })
        .lean()
        .exec();
    } catch (error) {}

    return {
      articles,
      users,
      nextPage: articles.length >= config.articlesPerPage,
    };
  }
}

export default new ArticleService();
