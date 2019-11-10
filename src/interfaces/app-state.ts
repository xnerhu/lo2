import { INews, INewsCategory, INewsChunk } from './news';
import { IPress } from './press';
import { ITeachersSection } from './teachers';
import { IGallerySection } from './gallery';

export interface IAppState {
  shortNews?: INews[];
  news?: INewsChunk;
  newsCategories?: INewsCategory[];
  article?: INews;
  slider?: string[];
  teachers?: ITeachersSection[];
  gallery?: IGallerySection[];

  pressItems?: IPress[];
}
