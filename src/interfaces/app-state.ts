import { INews, INewsCategory, INewsChunk } from './news';
import { IPress } from './press';
import { ITeachersSection } from './teachers';

export interface IAppState {
  shortNews?: INews[];
  news?: INewsChunk;
  newsCategories?: INewsCategory[];
  article?: INews;
  proposedNews?: INews[];
  slider?: string[];
  teachers?: ITeachersSection[];

  pressItems?: IPress[];
}
