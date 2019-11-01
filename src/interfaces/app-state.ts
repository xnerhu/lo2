import { INews } from './news';
import { IPress } from './press';
import { ITeachersSection } from './teachers';
import { IGallerySection } from './gallery';

export type IAppStateItem = 'shortNews' | 'slider' | 'teachers';

export interface IAppState {
  shortNews?: INews[];
  slider?: string[];
  teachers?: ITeachersSection[];


  pressItems?: IPress[];
  gallery?: IGallerySection[];
}
