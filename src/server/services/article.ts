import { resolve } from 'path';

import { db } from '../models/db';
import {
  IArticleFilter,
  IArticle,
  IArticleListChunk,
} from '~/interfaces/article';
import ArticleCategoryService from './article-category';
import {
  getUniqueValues,
  IArticleFormat,
  formatArticle,
  formatLabel,
  makeId,
  formatUser,
} from '../utils';
import UserService from './user';
import { IInsertArticleData, IEditArticleData } from '../interfaces';
import { NEWS_IMAGES_PATH } from '../constants';
import { saveImage, deleteImages } from '../utils/images';
import { IEditArticleErrors } from '~/interfaces';

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

  public async getRawArticle(label: string) {
    const res = await db<IArticle>('news').where({ label }).limit(1);

    return res;
  }

  public async insert(data: IInsertArticleData) {
    const { title, body, categoryId, authorId, image } = data;

    let label = formatLabel(title);

    const [hasLabel] = await this.getRawArticle(label);

    if (hasLabel != null) {
      label = `${label}-${makeId(96)}`;
    }

    const [id] = await db<IArticle>('news').insert({
      label,
      title,
      content: body,
      categoryId,
      authorId,
      hasImage: !!image,
    });

    if (image) {
      const path = resolve(NEWS_IMAGES_PATH, id.toString());

      await saveImage(image.buffer, path);
    }

    return label;
  }

  public async delete(label: string) {
    if (!label) return new Error('Nie podano identyfikatora artykułu!');

    const [item] = await this.getRawArticle(label);

    if (!item) {
      return new Error('Artykuł nie istnieje!');
    }

    await db<IArticle>('news').where({ label }).limit(1).delete();

    const imgPath = resolve(NEWS_IMAGES_PATH, item.id.toString());

    await deleteImages(imgPath);

    return null;
  }

  public async getPlainArtice(label: string): Promise<IArticle> {
    if (!label) return null;

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

    const [data]: any[] = await query.select();

    if (!data) return null;

    return {
      ...data.news,
      _category: data['news-categories'],
      _author: formatUser(data.users),
    };
  }

  public async editArticle(
    data: IEditArticleData,
  ): Promise<IEditArticleErrors | string> {
    const { label, title, content, categoryId, image, deleteImage } = data;

    if (!label) {
      return { label: 'Nie podano identyfikatora artykułu!' };
    }

    const [item] = await this.getRawArticle(label);

    if (!item) {
      return { label: 'Artykuł nie istnieje!' };
    }

    await db<IArticle>('news').where({ label }).limit(1).update({
      title,
      content,
      categoryId,
    });

    const imgPath = resolve(NEWS_IMAGES_PATH, item.id.toString());

    if (deleteImage && item.hasImage) {
      await deleteImages(imgPath);

      await db<IArticle>('news').where({ label }).limit(1).update({
        hasImage: false,
      });
    } else if (image) {
      await saveImage(image.buffer, imgPath);

      await db<IArticle>('news').where({ label }).limit(1).update({
        hasImage: true,
      });
    }

    return label;
  }
}

export default new ArticleService();
