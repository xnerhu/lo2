import { INews, INewsCategory, INewsChunk } from './news';
import { IPress } from './press';
import { ITeachersSection } from './teachers';
import { IGallerySection, IGalleryAlbum } from './gallery';

export interface IAppState {
  shortNews?: INews[];
  news?: INewsChunk;
  newsCategories?: INewsCategory[];
  article?: INews;
  proposedNews?: INews[];
  slider?: string[];
  teachers?: ITeachersSection[];
  gallerySections?: IGallerySection[];
  album?: IGalleryAlbum;

  pressItems?: IPress[];
}
