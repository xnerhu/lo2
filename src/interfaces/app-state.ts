import { INews } from './news';
import { IPress } from './press';
import { ITeachersSection } from './teachers';
import { IGallerySection } from './gallery';

export interface IAppState {
  sliderItems?: string[];
  shortNews?: INews[];
  pressItems?: IPress[];
  teachersItems?: ITeachersSection[];
  gallery?: IGallerySection[];
}
