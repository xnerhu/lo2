import { INews, INewsCategory, INewsChunk, IArticleChunk } from './news';
import { ITeachersSection } from './teachers';

export interface IAppState {
  shortNews?: INews[];
  news?: INewsChunk;
  newsCategories?: INewsCategory[];
  article?: IArticleChunk;
  slider?: string[];
  teachers?: ITeachersSection[];
}
