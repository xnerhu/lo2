import { IArticle } from '~/interfaces';
import { config } from '../constants';
import SerializerService from '../services/seralizer';
import ImageService from '../services/image';

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
}

export default new ArticleService();
